/**
 * Quantum Merlin - Feedback Modal System
 * Discreet feedback collection across all tools
 */

// Inject feedback modal HTML into page
function initFeedbackModal() {
    // Check if modal already exists
    if (document.getElementById('feedbackModal')) return;
    
    // Get page title for subject
    const pageTitle = document.title.split('|')[0].trim();
    
    // Create modal HTML
    const modalHTML = `
        <!-- Feedback Modal -->
        <div id="feedbackModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.85); z-index: 10000; align-items: center; justify-content: center; backdrop-filter: blur(5px);" onclick="if(event.target.id === 'feedbackModal') closeFeedbackModal()">
            <div style="background: linear-gradient(135deg, rgba(10, 10, 15, 0.95), rgba(45, 27, 78, 0.95)); border: 2px solid rgba(0, 245, 255, 0.4); border-radius: 25px; padding: 35px 40px; max-width: 550px; width: 90%; position: relative; box-shadow: 0 20px 60px rgba(0, 245, 255, 0.3);" onclick="event.stopPropagation()">
                <button onclick="closeFeedbackModal()" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: rgba(255, 255, 255, 0.6); font-size: 1.5rem; cursor: pointer; transition: all 0.3s ease; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.color='#ff0066'" onmouseout="this.style.color='rgba(255,255,255,0.6'">×</button>
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="font-size: 2.5rem; margin-bottom: 10px;">🔮✨</div>
                    <h3 style="color: #00f5ff; font-family: 'Orbitron', monospace; font-size: 1.3rem; margin-bottom: 8px;">Help Us Improve</h3>
                    <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.95rem;">Tell us what to fix, add, or change across the board</p>
                </div>
                <form action="https://formspree.io/f/mgowrolb" method="POST" onsubmit="setTimeout(() => closeFeedbackModal(), 500)">
                    <input type="hidden" name="_subject" value="Feedback from ${pageTitle}">
                    <input type="email" name="email" placeholder="Your email (optional)" style="width: 100%; padding: 12px 16px; margin-bottom: 15px; border: 1px solid rgba(0, 245, 255, 0.3); border-radius: 10px; background: rgba(10, 10, 15, 0.6); color: #fff; font-size: 0.95rem;">
                    <textarea name="message" placeholder="Your suggestions, requests, or issues..." required style="width: 100%; padding: 12px 16px; margin-bottom: 15px; border: 1px solid rgba(0, 245, 255, 0.3); border-radius: 10px; background: rgba(10, 10, 15, 0.6); color: #fff; font-size: 0.95rem; min-height: 120px; resize: vertical; font-family: inherit;"></textarea>
                    <button type="submit" style="width: 100%; padding: 14px; background: linear-gradient(135deg, #00f5ff, #9d00ff); border: none; border-radius: 10px; color: #fff; font-weight: 600; cursor: pointer; font-size: 1rem; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0, 245, 255, 0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0, 245, 255, 0.5)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(0, 245, 255, 0.3)'">Send Feedback ✨</button>
                </form>
                <p style="color: rgba(255, 255, 255, 0.5); font-size: 0.85rem; margin-top: 15px; text-align: center;">Or email directly: <a href="mailto:change@quantummerlin.com" style="color: #ffd700; text-decoration: none;">change@quantummerlin.com</a></p>
            </div>
        </div>
    `;
    
    // Append to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Open feedback modal
function openFeedbackModal(e) {
    if (e) e.preventDefault();
    document.getElementById('feedbackModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close feedback modal
function closeFeedbackModal() {
    document.getElementById('feedbackModal').style.display = 'none';
    document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeFeedbackModal();
});

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFeedbackModal);
} else {
    initFeedbackModal();
}
