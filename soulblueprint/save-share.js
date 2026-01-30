// ============================================
// SAVE, SHARE & PAGINATION FUNCTIONALITY
// ============================================

// Pagination state
let currentPage = 0;
let totalPages = 0;
const SECTIONS_PER_PAGE = 1; // Show one major section per page for AdSense

// Initialize pagination after readings are built
function initializePagination() {
    const sections = document.querySelectorAll('.reading-section');
    totalPages = sections.length;
    
    if (totalPages > 0) {
        showPage(0);
        document.getElementById('action-buttons').style.display = 'flex';
    }
}

function showPage(pageIndex) {
    const sections = document.querySelectorAll('.reading-section');
    currentPage = Math.max(0, Math.min(pageIndex, totalPages - 1));
    
    // Hide all sections except current
    sections.forEach((section, index) => {
        if (index === currentPage) {
            section.classList.remove('hidden');
            section.classList.add('active');
        } else {
            section.classList.add('hidden');
            section.classList.remove('active');
        }
    });
    
    // Update pagination controls
    updatePaginationControls();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Track page view (for AdSense)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: `Reading Section ${currentPage + 1}`,
            page_location: window.location.href
        });
    }
}

function updatePaginationControls() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const indicator = document.getElementById('page-indicator');
    
    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages - 1;
    if (indicator) indicator.textContent = `Section ${currentPage + 1} of ${totalPages}`;
}

function nextPage() {
    if (currentPage < totalPages - 1) {
        showPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

// ============================================
// PRINT FUNCTIONALITY
// ============================================

function printReading() {
    // Show all sections for printing
    const sections = document.querySelectorAll('.reading-section');
    sections.forEach(section => {
        section.style.display = 'block';
    });
    
    window.print();
    
    // Restore pagination after print
    setTimeout(() => {
        initializePagination();
    }, 1000);
}

// ============================================
// DOWNLOAD AS HTML
// ============================================

function downloadReading() {
    const userData = JSON.parse(localStorage.getItem('lastReading') || '{}');
    const fileName = `${userData.name || 'moment'}-reading-${new Date().toISOString().split('T')[0]}.html`;
    
    // Clone the page content
    const clone = document.cloneNode(true);
    
    // Remove interactive elements from clone
    const toRemove = clone.querySelectorAll('#action-buttons, .pagination-controls, .ad-container, #theme-bar');
    toRemove.forEach(el => el.remove());
    
    // Show all sections in download
    const sections = clone.querySelectorAll('.reading-section');
    sections.forEach(section => {
        section.style.display = 'block';
        section.classList.remove('active');
    });
    
    // Create downloadable HTML
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A Moment in Time for ${userData.name}</title>
    <style>
        ${document.getElementById('dynamic-styles').innerHTML}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>A Moment in Time for ${userData.name}</h1>
            <p>Born: ${formatDate(userData.birthDate)} at ${userData.birthTime || 'unknown time'}</p>
            <p>Location: ${userData.birthPlace || 'unknown location'}</p>
            <p>Generated: ${new Date().toLocaleDateString()}</p>
        </header>
        ${document.getElementById('results').innerHTML}
    </div>
</body>
</html>`;
    
    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ============================================
// SHARE FUNCTIONALITY
// ============================================

async function shareReading() {
    const userData = JSON.parse(localStorage.getItem('lastReading') || '{}');
    const shareData = {
        title: `A Moment in Time for ${userData.name}`,
        text: `Check out ${userData.name}'s Moment in Time reading with 65+ personalized insights!`,
        url: window.location.href
    };
    
    // Check if Web Share API is available
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            if (err.name !== 'AbortError') {
                fallbackShare(shareData);
            }
        }
    } else {
        fallbackShare(shareData);
    }
}

function fallbackShare(shareData) {
    // Copy link to clipboard
    const tempInput = document.createElement('input');
    tempInput.value = shareData.url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Show confirmation
    alert('Link copied to clipboard! Share it with friends and family.');
}

// ============================================
// LOCALSTORAGE PERSISTENCE
// ============================================

function saveReadingData(userData, readings) {
    const saveData = {
        userData: userData,
        readings: readings,
        savedAt: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('lastReading', JSON.stringify(userData));
        localStorage.setItem('lastReadingData', JSON.stringify(saveData));
        console.log('Reading saved to localStorage');
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

function loadLastReading() {
    try {
        const savedData = localStorage.getItem('lastReadingData');
        if (savedData) {
            const data = JSON.parse(savedData);
            const savedDate = new Date(data.savedAt);
            const daysSince = (new Date() - savedDate) / (1000 * 60 * 60 * 24);
            
            // Only auto-load if less than 7 days old
            if (daysSince < 7) {
                return data;
            }
        }
    } catch (e) {
        console.warn('Could not load from localStorage:', e);
    }
    return null;
}

function clearReading() {
    if (confirm('Start a new reading? This will clear the current reading.')) {
        localStorage.removeItem('lastReading');
        localStorage.removeItem('lastReadingData');
        location.reload();
    }
}

// ============================================
// AD MANAGEMENT
// ============================================

function insertAdSlots() {
    const sections = document.querySelectorAll('.reading-section');
    
    // Insert ad between every section
    sections.forEach((section, index) => {
        if (index < sections.length - 1) {
            const adContainer = document.createElement('div');
            adContainer.className = 'ad-container';
            adContainer.innerHTML = `
                <div class="ad-placeholder">
                    <!-- AdSense ad slot will go here -->
                    <p style="color: rgba(255,255,255,0.3);">Advertisement</p>
                    <ins class="adsbygoogle"
                         style="display:block"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                </div>
            `;
            
            section.parentNode.insertBefore(adContainer, section.nextSibling);
        }
    });
}

// Initialize AdSense (placeholder - replace with your publisher ID)
function initializeAdSense() {
    // TODO: Add your AdSense publisher ID
    // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"></script>
    
    if (typeof adsbygoogle !== 'undefined') {
        const ads = document.querySelectorAll('.adsbygoogle');
        ads.forEach(ad => {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.warn('AdSense error:', e);
            }
        });
    }
}

// ============================================
// AUTO-SAVE ON GENERATE
// ============================================

// Hook into the existing generateReading function
const originalGenerateReading = window.generateReading;
if (originalGenerateReading) {
    window.generateReading = function() {
        const result = originalGenerateReading.apply(this, arguments);
        
        // Save after generation
        const userData = {
            name: document.getElementById('name').value,
            birthDate: document.getElementById('birthDate').value,
            birthTime: document.getElementById('birthTime').value,
            birthPlace: document.getElementById('birthPlace').value
        };
        
        // Save will happen after readings are generated
        setTimeout(() => {
            const readings = window.lastGeneratedReadings;
            if (readings) {
                saveReadingData(userData, readings);
            }
        }, 1000);
        
        return result;
    };
}
