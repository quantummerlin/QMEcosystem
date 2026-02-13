/* ============================================
   Visual Soul Blueprint Platform - Main JS
   ============================================ */

// ===== Copy to Clipboard =====
function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        if (buttonElement) {
            const original = buttonElement.innerText;
            buttonElement.innerText = '✓ Copied!';
            buttonElement.classList.add('copied');
            setTimeout(() => {
                buttonElement.innerText = original;
                buttonElement.classList.remove('copied');
            }, 2000);
        }
        showNotification('Copied to clipboard!');
    }).catch(err => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        if (buttonElement) {
            const original = buttonElement.innerText;
            buttonElement.innerText = '✓ Copied!';
            buttonElement.classList.add('copied');
            setTimeout(() => {
                buttonElement.innerText = original;
                buttonElement.classList.remove('copied');
            }, 2000);
        }
        showNotification('Copied to clipboard!');
    });
}

// Copy prompt from a prompt-box
function copyPrompt(btn) {
    const box = btn.closest('.prompt-box');
    const pre = box.querySelector('pre');
    if (pre) {
        copyToClipboard(pre.innerText, btn);
    }
}

// ===== Notification Toast =====
function showNotification(message, duration = 2000) {
    const notification = document.createElement('div');
    notification.className = 'toast-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, duration);
}

// ===== Smooth Scroll =====
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Scroll Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Auto-apply animation class to sections
    document.querySelectorAll('section, .hero, .cta').forEach(section => {
        if (!section.classList.contains('animate-on-scroll')) {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        }
    });

    // ===== Mobile Menu Toggle =====
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });
    }

    // ===== Accordion =====
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all siblings (optional - remove for independent toggles)
            const accordion = item.parentElement;
            if (accordion.classList.contains('accordion-single')) {
                accordion.querySelectorAll('.accordion-item').forEach(sibling => {
                    sibling.classList.remove('active');
                });
            }
            
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    // ===== Progress Tracking =====
    updateProgressBar();

    // ===== Active Nav Highlighting =====
    highlightActiveNav();
});

// ===== Progress Tracking =====
function saveProgress(sectionId, completed) {
    let progress = JSON.parse(localStorage.getItem('blueprintProgress') || '{}');
    progress[sectionId] = completed;
    localStorage.setItem('blueprintProgress', JSON.stringify(progress));
    updateProgressBar();
}

function getProgress() {
    return JSON.parse(localStorage.getItem('blueprintProgress') || '{}');
}

function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    if (!progressBar) return;

    const progress = getProgress();
    const sections = document.querySelectorAll('[data-progress-section]');
    if (sections.length === 0) return;

    const completed = sections.length > 0 
        ? Array.from(sections).filter(s => progress[s.dataset.progressSection]).length 
        : 0;
    const percentage = Math.round((completed / sections.length) * 100);
    
    progressBar.style.width = percentage + '%';
    if (progressText) {
        progressText.textContent = `${completed} of ${sections.length} sections explored (${percentage}%)`;
    }
}

// ===== Active Nav Link =====
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPage || href.endsWith('/' + currentPage))) {
            link.classList.add('active');
        }
    });
}

// ===== External Link Handler =====
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="http"]');
    if (link && !link.hostname.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ===== Back to Top Button =====
(function() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Back to top');
    btn.title = 'Back to top';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function() {
        btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ===== Global Reading Paste =====
// Lets user paste their reading ONCE and all prompts auto-fill
(function() {
    const STORAGE_KEY = 'soulblueprint_reading';

    function getSavedReading() {
        return localStorage.getItem(STORAGE_KEY) || '';
    }

    function injectReadingWidget() {
        // Only show on guide pages that have prompt-boxes
        const promptBoxes = document.querySelectorAll('.prompt-box pre');
        if (promptBoxes.length === 0) return;

        // Check if any prompts have the placeholder
        const hasPlaceholder = Array.from(promptBoxes).some(pre =>
            pre.textContent.includes('[PASTE YOUR FULL READING HERE]') ||
            pre.textContent.includes('[PASTE ALL READINGS]') ||
            pre.textContent.includes('[PASTE YOUR READING')
        );
        if (!hasPlaceholder) return;

        const saved = getSavedReading();
        const container = document.createElement('div');
        container.className = 'reading-paste-widget';
        container.innerHTML = `
            <div class="reading-paste-header">
                <h3>📋 Paste Your Reading Once</h3>
                <p>Paste your soul blueprint reading below and it will auto-fill into every prompt on this page.</p>
            </div>
            <textarea id="globalReading" placeholder="Paste your complete soul blueprint reading here... It will replace [PASTE YOUR FULL READING HERE] in every prompt below.">${saved}</textarea>
            <div class="reading-paste-actions">
                <button onclick="applyGlobalReading()" class="reading-paste-btn">✨ Apply to All Prompts</button>
                <button onclick="clearGlobalReading()" class="reading-paste-btn reading-paste-btn-outline">Clear</button>
                <span class="reading-paste-status" id="readingStatus">${saved ? '✅ Reading saved from last visit' : ''}</span>
            </div>
        `;

        // Insert after page header or progress bar
        const guideContent = document.querySelector('.guide-content');
        if (guideContent) {
            guideContent.insertBefore(container, guideContent.firstChild);
        }

        // Auto-apply if we have a saved reading
        if (saved) {
            setTimeout(() => applyGlobalReading(), 100);
        }
    }

    window.applyGlobalReading = function() {
        const reading = document.getElementById('globalReading')?.value?.trim();
        if (!reading) {
            showNotification('Please paste your reading first!');
            return;
        }

        localStorage.setItem(STORAGE_KEY, reading);

        document.querySelectorAll('.prompt-box pre').forEach(pre => {
            // Store the original template if not already stored
            if (!pre.dataset.originalTemplate) {
                pre.dataset.originalTemplate = pre.textContent;
            }
            let text = pre.dataset.originalTemplate;
            text = text.replace(/\[PASTE YOUR FULL READING HERE\]/gi, reading);
            text = text.replace(/\[PASTE ALL READINGS\]/gi, reading);
            text = text.replace(/\[PASTE YOUR READING(?:\(S\))?\s*HERE\]/gi, reading);
            pre.textContent = text;
        });

        const status = document.getElementById('readingStatus');
        if (status) status.textContent = '✅ Applied to all prompts!';
        showNotification('Reading applied to all prompts on this page!');
    };

    window.clearGlobalReading = function() {
        localStorage.removeItem(STORAGE_KEY);
        const textarea = document.getElementById('globalReading');
        if (textarea) textarea.value = '';

        // Restore original templates
        document.querySelectorAll('.prompt-box pre').forEach(pre => {
            if (pre.dataset.originalTemplate) {
                pre.textContent = pre.dataset.originalTemplate;
            }
        });

        const status = document.getElementById('readingStatus');
        if (status) status.textContent = '';
        showNotification('Reading cleared');
    };

    document.addEventListener('DOMContentLoaded', injectReadingWidget);
})();
