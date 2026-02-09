// ============================================
// SAVE, SHARE & PAGINATION FUNCTIONALITY
// ============================================

// Pagination state (disabled - show all sections)
let currentPage = 0;
let totalPages = 0;
const SECTIONS_PER_PAGE = 0;

// Initialize pagination after readings are built
function initializePagination() {
    const sections = document.querySelectorAll('.reading-section');
    totalPages = sections.length;
    
    if (totalPages > 0) {
        sections.forEach((section) => {
            section.classList.remove('hidden');
            section.classList.add('active');
            section.style.display = 'block';
        });
        const controls = document.querySelector('.pagination-controls');
        if (controls) {
            controls.style.display = 'none';
        }
        const actionButtons = document.getElementById('action-buttons');
        if (actionButtons) {
            actionButtons.style.display = 'flex';
        }
    }
}

function showPage(pageIndex) {
    const sections = document.querySelectorAll('.reading-section');
    sections.forEach((section) => {
        section.classList.remove('hidden');
        section.classList.add('active');
        section.style.display = 'block';
    });
    const controls = document.querySelector('.pagination-controls');
    if (controls) {
        controls.style.display = 'none';
    }
}

function updatePaginationControls() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const indicator = document.getElementById('page-indicator');
    
    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages - 1;
    if (indicator) indicator.textContent = `Sección ${currentPage + 1} de ${totalPages}`;
}

function nextPage() {
    showPage(currentPage);
}

function prevPage() {
    showPage(currentPage);
}

// ============================================
// GIFT GENERATION - Beautiful Printable Gift
// ============================================

function generateGiftReading() {
    const userData = JSON.parse(localStorage.getItem('lastReading') || '{}');
    const name = userData.name || 'esta alma especial';
    const birthDate = formatDate(userData.birthDate);
    const birthTime = userData.birthTime || 'un momento sagrado';
    const birthPlace = userData.birthPlace || 'su lugar especial';
    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Get all reading content
    const readingSections = document.querySelectorAll('.reading-section');
    let readingContent = '';
    
    readingSections.forEach(section => {
        // Clone and clean each section
        const clone = section.cloneNode(true);
        // Remove interactive elements
        clone.querySelectorAll('.mark-read-btn, .read-badge, .expand-icon, button').forEach(el => el.remove());
        // Expand all content
        clone.querySelectorAll('.section-content').forEach(content => {
            content.style.display = 'block';
            content.style.maxHeight = 'none';
        });
        readingContent += clone.outerHTML;
    });
    
    const giftHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Un Momento en el Tiempo - Un Regalo para ${name}</title>
    <style>
        /* ============================================ */
        /* GIFT READING STYLES                         */
        /* ============================================ */
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            background: linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 25%, #1a0a2e 50%, #0d0520 100%);
            color: #e8d5ff;
            line-height: 1.8;
            min-height: 100vh;
        }
        
        .gift-wrapper {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        /* Gift Envelope Cover */
        .gift-cover {
            background: linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(147,112,219,0.2) 100%);
            border: 3px solid rgba(255,215,0,0.4);
            border-radius: 20px;
            padding: 60px 40px;
            text-align: center;
            margin-bottom: 40px;
            position: relative;
            overflow: hidden;
        }
        
        .gift-cover::before {
            content: '✨';
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 2rem;
            animation: sparkle 2s infinite;
        }
        
        .gift-cover::after {
            content: '✨';
            position: absolute;
            bottom: 20px;
            right: 20px;
            font-size: 2rem;
            animation: sparkle 2s infinite 0.5s;
        }
        
        @keyframes sparkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
        
        .gift-ribbon {
            font-size: 4rem;
            margin-bottom: 20px;
        }
        
        .gift-title {
            font-size: 2.5rem;
            color: #ffd700;
            text-shadow: 0 0 30px rgba(255,215,0,0.5);
            margin-bottom: 10px;
            font-weight: normal;
            letter-spacing: 2px;
        }
        
        .gift-subtitle {
            font-size: 1.3rem;
            color: #c9a0ff;
            font-style: italic;
            margin-bottom: 30px;
        }
        
        .gift-for {
            font-size: 2rem;
            color: #fff;
            text-shadow: 0 0 20px rgba(255,255,255,0.3);
        }
        
        .gift-for strong {
            color: #ffd700;
            display: block;
            font-size: 2.5rem;
            margin-top: 10px;
        }
        
        /* Gift Letter */
        .gift-letter {
            background: rgba(255,255,255,0.05);
            border: 2px solid rgba(255,215,0,0.2);
            border-radius: 15px;
            padding: 40px;
            margin-bottom: 40px;
        }
        
        .letter-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255,215,0,0.2);
        }
        
        .letter-header h2 {
            color: #ffd700;
            font-size: 1.8rem;
            font-weight: normal;
            letter-spacing: 1px;
        }
        
        .letter-date {
            color: #9370db;
            font-style: italic;
            margin-top: 10px;
        }
        
        .letter-body {
            font-size: 1.1rem;
            line-height: 2;
        }
        
        .letter-body p {
            margin-bottom: 20px;
            text-indent: 2em;
        }
        
        .letter-body p:first-child {
            text-indent: 0;
        }
        
        .letter-body .greeting {
            font-size: 1.3rem;
            color: #c9a0ff;
            margin-bottom: 25px;
            text-indent: 0;
        }
        
        .letter-body .highlight {
            color: #ffd700;
            font-weight: bold;
        }
        
        .letter-closing {
            margin-top: 40px;
            text-align: center;
            font-style: italic;
            color: #c9a0ff;
        }
        
        .letter-closing .signature {
            margin-top: 15px;
            font-size: 1.3rem;
            color: #ffd700;
        }
        
        /* How to Keep Forever Box */
        .save-instructions {
            background: linear-gradient(135deg, rgba(147,112,219,0.2) 0%, rgba(75,0,130,0.3) 100%);
            border: 2px dashed rgba(255,215,0,0.4);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 40px;
        }
        
        .save-instructions h3 {
            color: #ffd700;
            text-align: center;
            font-size: 1.4rem;
            margin-bottom: 20px;
            font-weight: normal;
        }
        
        .save-instructions h3::before {
            content: '💫 ';
        }
        
        .save-instructions h3::after {
            content: ' 💫';
        }
        
        .save-steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        
        .save-step {
            background: rgba(0,0,0,0.2);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
        }
        
        .save-step .step-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        
        .save-step h4 {
            color: #c9a0ff;
            font-size: 1rem;
            margin-bottom: 8px;
            font-weight: normal;
        }
        
        .save-step p {
            font-size: 0.9rem;
            color: #b8a0d0;
        }
        
        /* Birth Details Banner */
        .birth-banner {
            background: rgba(255,215,0,0.1);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            margin-bottom: 40px;
            border: 1px solid rgba(255,215,0,0.2);
        }
        
        .birth-banner h3 {
            color: #ffd700;
            font-size: 1.2rem;
            font-weight: normal;
            margin-bottom: 10px;
        }
        
        .birth-details {
            color: #c9a0ff;
            font-size: 1rem;
        }
        
        .birth-details span {
            display: inline-block;
            margin: 0 15px;
        }
        
        /* Reading Section Styles */
        .reading-section {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(147,112,219,0.2);
            border-radius: 15px;
            margin-bottom: 25px;
            overflow: hidden;
            page-break-inside: avoid;
        }
        
        .section-header {
            background: linear-gradient(135deg, rgba(147,112,219,0.3) 0%, rgba(75,0,130,0.4) 100%);
            padding: 20px 25px;
            cursor: default;
        }
        
        .section-title {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .section-icon {
            font-size: 1.8rem;
        }
        
        .section-name {
            font-size: 1.3rem;
            color: #ffd700;
            font-weight: normal;
        }
        
        .section-sign {
            font-size: 1rem;
            color: #c9a0ff;
            margin-left: auto;
        }
        
        .section-content {
            padding: 25px;
            display: block !important;
            max-height: none !important;
        }
        
        .section-content p {
            margin-bottom: 15px;
            line-height: 1.9;
        }
        
        .section-content em {
            color: #ffd700;
            font-style: normal;
            font-weight: bold;
        }
        
        .section-content strong {
            color: #c9a0ff;
        }
        
        /* Footer */
        .gift-footer {
            text-align: center;
            padding: 40px 20px;
            border-top: 1px solid rgba(255,215,0,0.2);
            margin-top: 40px;
        }
        
        .gift-footer p {
            color: #9370db;
            font-style: italic;
            margin-bottom: 10px;
        }
        
        .gift-footer .brand {
            color: #ffd700;
            font-size: 1.2rem;
        }
        
        /* Print Styles */
        @media print {
            body {
                background: white;
                color: #333;
                font-size: 11pt;
            }
            
            .gift-wrapper {
                max-width: 100%;
                padding: 0;
            }
            
            .gift-cover {
                background: #f5f0ff;
                border-color: #9370db;
                page-break-after: always;
            }
            
            .gift-cover::before,
            .gift-cover::after {
                display: none;
            }
            
            .gift-title,
            .gift-for strong,
            .letter-header h2,
            .save-instructions h3,
            .section-name,
            .section-content em {
                color: #4b0082;
            }
            
            .gift-subtitle,
            .gift-for,
            .letter-body .greeting,
            .letter-closing,
            .section-sign,
            .section-content strong {
                color: #666;
            }
            
            .save-instructions {
                page-break-after: always;
            }
            
            .reading-section {
                page-break-inside: avoid;
                border-color: #ddd;
                margin-bottom: 15px;
            }
            
            .section-header {
                background: #f0e6ff;
            }
        }
    </style>
</head>
<body>
    <div class="gift-wrapper">
        <!-- Gift Cover -->
        <div class="gift-cover">
            <div class="gift-ribbon">🎁</div>
            <h1 class="gift-title">Un Momento en el Tiempo</h1>
            <p class="gift-subtitle">Una Lectura Cósmica de Regalo</p>
            <div class="gift-for">
                Creado Especialmente Para
                <strong>${name}</strong>
            </div>
        </div>
        
        <!-- Gift Letter -->
        <div class="gift-letter">
            <div class="letter-header">
                <h2>✨ Una Carta Para Ti ✨</h2>
                <p class="letter-date">${today}</p>
            </div>
            <div class="letter-body">
                <p class="greeting">Querido/a ${name},</p>
                
                <p>Esta lectura es un <span class="highlight">regalo</span> — un retrato cósmico capturado en el momento exacto en que llegaste a este mundo. A las <span class="highlight">${birthTime}</span> del <span class="highlight">${birthDate}</span> en <span class="highlight">${birthPlace}</span>, las estrellas, los planetas y las fuerzas cósmicas se alinearon en un patrón que nunca ha existido antes y nunca volverá a existir.</p>
                
                <p>Lo que sigue no es una predicción de quién debes ser, ni una limitación de lo que puedes lograr. Es un <span class="highlight">mapa de posibilidades</span> — los dones únicos que llevas, los desafíos que te ayudan a crecer y los temas cósmicos tejidos en tu propia esencia.</p>
                
                <p>Algunas perspectivas resonarán inmediatamente, como si alguien finalmente pusiera palabras a lo que siempre has sentido. Otras pueden tardar años en revelar su significado. <span class="highlight">Esta lectura es una compañera de por vida</span>, no un pronóstico diario. Vuelve a ella durante momentos de cambio, confusión o celebración. Deja que te recuerde quién eres debajo de todos los roles que desempeñas.</p>
                
                <p>Esto no se trata de que la astrología prediga tu destino. Se trata de reconocer los temas cósmicos que te hacen <span class="highlight">irreemplazablemente tú</span>.</p>
                
                <p>Eres la única persona en toda la historia de la humanidad que ha tenido este plano cósmico exacto. Eres <span class="highlight">literalmente único/a</span>.</p>
            </div>
            <div class="letter-closing">
                Con amor y asombro cósmico,
                <div class="signature">✨ Quantum Merlin ✨</div>
            </div>
        </div>
        
        <!-- How to Keep Forever -->
        <div class="save-instructions">
            <h3>Cómo Conservar Este Regalo Para Siempre</h3>
            <div class="save-steps">
                <div class="save-step">
                    <div class="step-icon">💾</div>
                    <h4>Guarda Este Archivo</h4>
                    <p>Este es un archivo HTML completo. Guárdalo en tu computadora, teléfono o almacenamiento en la nube para acceder en cualquier momento, ¡incluso sin conexión!</p>
                </div>
                <div class="save-step">
                    <div class="step-icon">🖨️</div>
                    <h4>Imprímelo</h4>
                    <p>Presiona Ctrl+P (o Cmd+P en Mac) para imprimir esta lectura. Está diseñada para verse hermosa en papel.</p>
                </div>
                <div class="save-step">
                    <div class="step-icon">📱</div>
                    <h4>Ábrelo Cuando Quieras</h4>
                    <p>Haz doble clic en este archivo en cualquier momento para abrirlo en cualquier navegador web, ¡no se necesita internet!</p>
                </div>
                <div class="save-step">
                    <div class="step-icon">🎁</div>
                    <h4>Comparte el Regalo</h4>
                    <p>¡Envía este archivo a amigos y familiares para que puedan leer tu plano cósmico también!</p>
                </div>
            </div>
        </div>
        
        <!-- Birth Details -->
        <div class="birth-banner">
            <h3>✨ Coordenadas Cósmicas ✨</h3>
            <div class="birth-details">
                <span>📅 ${birthDate}</span>
                <span>🕐 ${birthTime}</span>
                <span>📍 ${birthPlace}</span>
            </div>
        </div>
        
        <!-- All Reading Sections -->
        <div class="reading-content">
            ${readingContent}
        </div>
        
        <!-- Footer -->
        <div class="gift-footer">
            <p>"Estás hecho de polvo de estrellas."</p>
            <p>— Carl Sagan</p>
            <p class="brand">✨ Quantum Merlin - Un Momento en el Tiempo ✨</p>
            <p style="color: #666; font-size: 0.9rem; margin-top: 20px;">Generado el ${today} en quantummerlin.com</p>
        </div>
    </div>
</body>
</html>`;

    // Create and download the gift file
    const fileName = `${name.replace(/[^a-zA-Z0-9]/g, '-')}-Momento-en-el-Tiempo-Regalo.html`;
    const blob = new Blob([giftHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show confirmation
    showGiftConfirmation(name);
}

function showGiftConfirmation(name) {
    // Create a nice modal confirmation
    const modal = document.createElement('div');
    modal.className = 'gift-modal';
    modal.innerHTML = `
        <div class="gift-modal-content">
            <div class="gift-modal-icon">🎁</div>
            <h2>¡Regalo Creado!</h2>
            <p>Se ha descargado una hermosa lectura de regalo para <strong>${name}</strong>.</p>
            <div class="gift-modal-tips">
                <p>📁 Encuéntralo en tu carpeta de Descargas</p>
                <p>📧 Envíalo por correo a alguien especial</p>
                <p>🖨️ Imprímelo como recuerdo</p>
                <p>💾 Guárdalo para siempre — ¡funciona sin conexión!</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="gift-modal-close">✨ ¡Entendido! ✨</button>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .gift-modal-content {
            background: linear-gradient(135deg, #2d1b4e, #1a0a2e);
            border: 2px solid rgba(255,215,0,0.4);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            max-width: 400px;
            animation: scaleIn 0.3s ease;
        }
        .gift-modal-icon {
            font-size: 4rem;
            margin-bottom: 20px;
        }
        .gift-modal-content h2 {
            color: #ffd700;
            font-size: 1.8rem;
            margin-bottom: 15px;
        }
        .gift-modal-content p {
            color: #e8d5ff;
            margin-bottom: 10px;
        }
        .gift-modal-content strong {
            color: #ffd700;
        }
        .gift-modal-tips {
            background: rgba(0,0,0,0.2);
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            text-align: left;
        }
        .gift-modal-tips p {
            margin: 8px 0;
            font-size: 0.95rem;
        }
        .gift-modal-close {
            background: linear-gradient(135deg, #ffd700, #daa520);
            border: none;
            color: #1a0a2e;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 1.1rem;
            cursor: pointer;
            font-weight: bold;
            transition: transform 0.2s;
        }
        .gift-modal-close:hover {
            transform: scale(1.05);
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
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
    const fileName = `${userData.name || 'momento'}-lectura-${new Date().toISOString().split('T')[0]}.html`;
    
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
    <title>Un Momento en el Tiempo para ${userData.name}</title>
    <style>
        ${document.getElementById('dynamic-styles').innerHTML}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Un Momento en el Tiempo para ${userData.name}</h1>
            <p>Nacido/a: ${formatDate(userData.birthDate)} a las ${userData.birthTime || 'hora desconocida'}</p>
            <p>Ubicación: ${userData.birthPlace || 'ubicación desconocida'}</p>
            <p>Generado: ${new Date().toLocaleDateString('es-ES')}</p>
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
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ============================================
// SHARE FUNCTIONALITY
// ============================================

async function shareReading() {
    const userData = JSON.parse(localStorage.getItem('lastReading') || '{}');
    const shareData = {
        title: `Un Momento en el Tiempo para ${userData.name}`,
        text: `¡Mira la lectura de Un Momento en el Tiempo de ${userData.name} con más de 65 perspectivas personalizadas!`,
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
    alert('¡Enlace copiado al portapapeles! Compártelo con amigos y familiares.');
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
    if (confirm('¿Comenzar una nueva lectura? Esto borrará la lectura actual.')) {
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
