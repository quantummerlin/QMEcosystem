/**
 * Quantum Merlin Share Utilities
 * Enhanced sharing functionality with viral personalized content
 */

window.QMShare = {
    // Site base URL
    baseUrl: 'https://quantummerlin.com/kpop/',
    
    // Current reading result (set dynamically)
    currentResult: null,
    
    // Viral share templates by tool type - K-Pop themed
    viralTemplates: {
        'life-path': (num, name) => `💫 My Idol Energy is ${num}! What's YOUR main character energy? 🌟 #KPopCosmos`,
        'destiny': (num, name) => `✨ My Debut Destiny Number is ${num}! Find your K-Pop purpose 💜`,
        'soul-urge': (num, name) => `💜 My Inner Stan Anthem is ${num} - this SLAYS! What's yours?`,
        'personality': (num, name) => `👑 Visual Aura ${num} - I'm THAT idol! Try it yourself 🌟`,
        'rising': (sign, name) => `💫 I'm a ${sign} Rising! My first impression era 🎤`,
        'moon': (sign, name) => `🌙 My Moon is in ${sign}! Find your emotional K-Pop vibe ✨`,
        'zodiac': (sign, name) => `♈ I'm a ${sign}! What's your idol star sign? 🌟`,
        'chinese': (animal, name) => `🐉 I'm a ${animal} in Chinese Zodiac! What's your spirit animal?`,
        'aura': (color, name) => `✨ My aura is ${color}! What color is YOUR idol energy?`,
        'age': (days, name) => `🎂 I'm ${days.toLocaleString()} days old! How many days have YOU lived?`,
        'personal-year': (num, name) => `📅 My Year Era Theme is ${num}! What's your era bringing? 🌟`,
        'fortune': (fortune) => `🔮 My cosmic fortune: "${fortune.substring(0, 80)}..." Get yours →`,
        'lucky-numbers': (nums) => `🍀 My lucky numbers: ${nums}! Find your cosmic numbers →`,
        'compatibility': (score) => `💕 Our Ship Chemistry: ${score}%! Check YOUR bias match 💜`,
        'forecast': (type) => `🌟 Just read my ${type} Comeback Forecast! See what the stars say for YOU →`,
        'default': () => `✨ Just discovered my K-Pop cosmic destiny! Fighting! 💜`
    },
    
    /**
     * Set the current reading result for personalized sharing
     */
    setResult(resultData) {
        this.currentResult = resultData;
    },
    
    /**
     * Generate viral share text from current result
     */
    getViralText() {
        if (!this.currentResult) {
            return this.viralTemplates.default();
        }
        
        const { type, value, name } = this.currentResult;
        const template = this.viralTemplates[type] || this.viralTemplates.default;
        return template(value, name);
    },
    
    /**
     * Get a clean shareable URL (not encoded, for functions that encode it themselves)
     */
    getCleanUrl() {
        const currentUrl = window.location.href;
        
        // If we're on reading-result.html with data params, use the source tool URL instead
        if (currentUrl.includes('reading-result.html') && currentUrl.includes('data=')) {
            if (this.currentResult && this.currentResult.sourceUrl) {
                return this.baseUrl + this.currentResult.sourceUrl;
            }
            return this.baseUrl;
        }
        
        // For other pages, use clean URL without query params if they're too long
        if (currentUrl.length > 200) {
            return window.location.origin + window.location.pathname;
        }
        
        return currentUrl;
    },
    
    /**
     * Get a clean shareable URL (encoded for URL parameters)
     */
    getPageUrl() {
        return encodeURIComponent(this.getCleanUrl());
    },
    
    /**
     * Get page title or custom text
     */
    getShareText(customText) {
        if (customText) return encodeURIComponent(customText);
        // Use viral text if available
        if (this.currentResult) return encodeURIComponent(this.getViralText());
        const title = document.querySelector('title')?.textContent || 'Check this out!';
        return encodeURIComponent(title);
    },
    
    /**
     * Share on Twitter/X with viral text
     */
    twitter(customText, customUrl) {
        const text = customText ? encodeURIComponent(customText) : this.getShareText();
        const url = customUrl ? encodeURIComponent(customUrl) : this.getPageUrl();
        const tweetUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        window.open(tweetUrl, '_blank', 'width=550,height=420');
    },
    
    /**
     * Share on Facebook
     */
    facebook(customUrl) {
        const url = customUrl ? encodeURIComponent(customUrl) : this.getPageUrl();
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(shareUrl, '_blank', 'width=580,height=400');
    },
    
    /**
     * Share on WhatsApp with viral text
     */
    whatsapp(customText, customUrl) {
        const text = customText || this.getViralText();
        const url = customUrl || this.getCleanUrl();
        const message = encodeURIComponent(`${text}\n\n${url}`);
        window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
    },
    
    /**
     * Share via Email with compelling subject
     */
    email(subject, body, customUrl) {
        const title = subject || `You need to try this! ${this.getViralText()}`;
        const url = customUrl || this.getCleanUrl();
        const emailBody = body || `Hey!\n\n${this.getViralText()}\n\nTry it yourself:\n${url}\n\n✨ It's eerily accurate!`;
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoUrl;
    },
    
    /**
     * Share via SMS/Text Message
     */
    sms(customText, customUrl) {
        const text = customText || this.getViralText();
        const url = customUrl || this.getCleanUrl();
        const message = encodeURIComponent(`${text}\n${url}`);
        window.location.href = `sms:?body=${message}`;
    },
    
    /**
     * Share on Pinterest
     */
    pinterest(imageUrl, description) {
        const url = this.getCleanUrl();
        const desc = encodeURIComponent(description || this.getViralText());
        const img = encodeURIComponent(imageUrl || 'https://quantummerlin.com/classic/RetroMerlin.jpg');
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${img}&description=${desc}`, '_blank', 'width=750,height=550');
    },
    
    /**
     * Share on Reddit
     */
    reddit(customTitle) {
        const url = this.getCleanUrl();
        const title = encodeURIComponent(customTitle || this.getViralText());
        window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${title}`, '_blank', 'width=750,height=550');
    },
    
    /**
     * Share on Threads
     */
    threads(customText) {
        const text = encodeURIComponent((customText || this.getViralText()) + '\n' + this.getCleanUrl());
        window.open(`https://threads.net/intent/post?text=${text}`, '_blank', 'width=550,height=420');
    },
    
    /**
     * Share on Telegram
     */
    telegram(customText, customUrl) {
        const text = encodeURIComponent(customText || this.getViralText());
        const url = encodeURIComponent(customUrl || this.getCleanUrl());
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank', 'width=550,height=420');
    },
    
    /**
     * Share on TikTok - Copies caption and opens TikTok upload
     */
    async tiktok(customText) {
        const text = customText || this.getViralText();
        const url = this.getCleanUrl();
        const tiktokCaption = `${text}\n\n🔗 ${url}\n\n#KPopCosmos #Numerology #Astrology #KPop #Spirituality #MainCharacterEnergy`;
        
        try {
            await navigator.clipboard.writeText(tiktokCaption);
            this.showCopyFeedback('📋 TikTok caption copied! Opening TikTok... 🎬');
            
            // Open TikTok upload (mobile) or website (desktop)
            setTimeout(() => {
                if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    window.open('https://www.tiktok.com/upload/', '_blank');
                } else {
                    window.open('https://www.tiktok.com/', '_blank');
                }
            }, 1000);
        } catch (err) {
            this.showCopyFeedback('⚠️ Please copy manually');
            alert(`TikTok Caption:\n\n${tiktokCaption}`);
        }
    },
    
    /**
     * Share on Instagram - Copies caption for stories/posts
     */
    async instagram(customText) {
        const text = customText || this.getViralText();
        const url = this.getCleanUrl();
        const instaCaption = `${text} ✨\n\n🔗 Link in bio: quantummerlin.com/kpop\n\n#KPopCosmos #Numerology #Astrology #Spirituality #KPop #IdolEnergy`;
        
        try {
            await navigator.clipboard.writeText(instaCaption);
            this.showCopyFeedback('📋 Instagram caption copied! Paste in your story or post 📸');
            
            setTimeout(() => {
                if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    window.open('instagram://story-camera', '_blank');
                }
            }, 1000);
        } catch (err) {
            this.showCopyFeedback('⚠️ Please copy manually');
            alert(`Instagram Caption:\n\n${instaCaption}`);
        }
    },
    
    /**
     * Copy link to clipboard
     */
    async copyLink(customUrl, showFeedback = true) {
        const url = customUrl || this.getCleanUrl();
        try {
            await navigator.clipboard.writeText(url);
            if (showFeedback) {
                this.showCopyFeedback('✓ Link copied!');
            }
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = url;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                if (showFeedback) {
                    this.showCopyFeedback('✓ Link copied!');
                }
                return true;
            } catch (e) {
                if (showFeedback) {
                    this.showCopyFeedback('Failed to copy');
                }
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    },
    
    /**
     * Copy viral result text to clipboard (for easy sharing anywhere)
     */
    async copyViralText() {
        const viralText = `${this.getViralText()}\n\n${this.getCleanUrl()}`;
        try {
            await navigator.clipboard.writeText(viralText);
            this.showCopyFeedback('✨ Ready to paste & share!');
            return true;
        } catch (err) {
            const textarea = document.createElement('textarea');
            textarea.value = viralText;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                this.showCopyFeedback('✨ Ready to paste & share!');
                return true;
            } catch (e) {
                this.showCopyFeedback('Failed to copy');
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    },
    
    /**
     * Copy custom result text to clipboard
     */
    async copyResult(resultText) {
        try {
            await navigator.clipboard.writeText(resultText);
            this.showCopyFeedback('✓ Result copied!');
            return true;
        } catch (err) {
            const textarea = document.createElement('textarea');
            textarea.value = resultText;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                this.showCopyFeedback('✓ Result copied!');
                return true;
            } catch (e) {
                this.showCopyFeedback('Failed to copy');
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    },
    
    /**
     * Show copy feedback notification
     */
    showCopyFeedback(message) {
        // Remove existing feedback
        const existing = document.querySelector('.qm-copy-feedback');
        if (existing) existing.remove();
        
        const feedback = document.createElement('div');
        feedback.className = 'qm-copy-feedback';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            z-index: 10000;
            animation: qmFadeInUp 0.3s ease-out;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'qmFadeOutDown 0.3s ease-out forwards';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    },
    
    /**
     * Native Share API (mobile-friendly)
     */
    async native(shareData) {
        const data = {
            title: shareData?.title || document.querySelector('title')?.textContent || 'Quantum Merlin',
            text: shareData?.text || this.getViralText(),
            url: shareData?.url || this.getCleanUrl()
        };
        
        if (navigator.share) {
            try {
                await navigator.share(data);
                return true;
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log('Native share failed, falling back');
                    this.showShareModal(data);
                }
                return false;
            }
        } else {
            // Fallback to modal on desktop
            this.showShareModal(data);
            return false;
        }
    },
    
    /**
     * Check if native share is supported
     */
    hasNativeShare() {
        return !!navigator.share;
    },
    
    /**
     * Show share modal (fallback for desktop)
     */
    showShareModal(shareData) {
        // Remove existing modal
        const existing = document.querySelector('.qm-share-modal-overlay');
        if (existing) existing.remove();
        
        const overlay = document.createElement('div');
        overlay.className = 'qm-share-modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: qmFadeIn 0.2s ease-out;
        `;
        
        const modal = document.createElement('div');
        modal.className = 'qm-share-modal';
        modal.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        `;
        
        modal.innerHTML = `
            <h3 style="color: #fff; margin: 0 0 20px; text-align: center; font-size: 1.4em;">
                ✨ Share This Reading
            </h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                <button onclick="QMShare.twitter('${encodeURIComponent(shareData.text || '')}'); QMShare.closeModal();" 
                    style="background: #000; border: none; border-radius: 12px; padding: 15px; cursor: pointer; color: white; transition: transform 0.2s, filter 0.2s; display: flex; align-items: center; justify-content: center;"
                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </button>
                <button onclick="QMShare.facebook(); QMShare.closeModal();" 
                    style="background: #4267B2; border: none; border-radius: 12px; padding: 15px; cursor: pointer; color: white; transition: transform 0.2s; display: flex; align-items: center; justify-content: center;"
                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button onclick="QMShare.whatsapp('${encodeURIComponent(shareData.text || '')}'); QMShare.closeModal();" 
                    style="background: #25D366; border: none; border-radius: 12px; padding: 15px; cursor: pointer; color: white; transition: transform 0.2s; display: flex; align-items: center; justify-content: center;"
                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </button>
                <button onclick="QMShare.email('${encodeURIComponent(shareData.title || '')}', '${encodeURIComponent(shareData.text || '')}'); QMShare.closeModal();" 
                    style="background: #EA4335; border: none; border-radius: 12px; padding: 15px; cursor: pointer; color: white; transition: transform 0.2s; display: flex; align-items: center; justify-content: center;"
                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </button>
                <button onclick="QMShare.sms('${encodeURIComponent(shareData.text || '')}'); QMShare.closeModal();" 
                    style="background: #5856D6; border: none; border-radius: 12px; padding: 15px; cursor: pointer; color: white; transition: transform 0.2s; display: flex; align-items: center; justify-content: center;"
                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>
                </button>
                <button onclick="QMShare.copyLink(); QMShare.closeModal();" 
                    style="background: #667eea; border: none; border-radius: 12px; padding: 15px; cursor: pointer; color: white; transition: transform 0.2s; display: flex; align-items: center; justify-content: center;"
                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                </button>
            </div>
            <button onclick="QMShare.closeModal();" 
                style="width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 12px; cursor: pointer; color: rgba(255,255,255,0.7); font-size: 14px; transition: all 0.2s;"
                onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                Cancel
            </button>
        `;
        
        overlay.appendChild(modal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeModal();
        });
        
        document.body.appendChild(overlay);
    },
    
    /**
     * Close share modal
     */
    closeModal() {
        const modal = document.querySelector('.qm-share-modal-overlay');
        if (modal) {
            modal.style.animation = 'qmFadeOut 0.2s ease-out forwards';
            setTimeout(() => modal.remove(), 200);
        }
    },
    
    /**
     * Share reading as image (requires html2canvas CDN to be loaded)
     * @param {string} elementSelector - CSS selector for the element to capture
     * @param {string} filename - Optional filename for download
     */
    async shareAsImage(elementSelector = '.result, #result, .reading-result', filename = 'quantum-merlin-reading.png') {
        const element = document.querySelector(elementSelector);
        
        if (!element) {
            this.showCopyFeedback('❌ No reading to share');
            return;
        }
        
        // Load html2canvas if not already loaded
        if (typeof html2canvas === 'undefined') {
            await this.loadHtml2Canvas();
        }
        
        try {
            this.showCopyFeedback('📸 Creating image...');
            
            // Create canvas from element
            const canvas = await html2canvas(element, {
                backgroundColor: '#0a0a0f',
                scale: 2, // Higher quality
                logging: false,
                useCORS: true,
                allowTaint: true
            });
            
            // Add watermark
            const ctx = canvas.getContext('2d');
            ctx.font = '16px Cinzel, serif';
            ctx.fillStyle = 'rgba(251, 191, 36, 0.6)';
            ctx.textAlign = 'right';
            ctx.fillText('quantummerlin.com', canvas.width - 20, canvas.height - 15);
            
            // Convert to blob
            canvas.toBlob(async (blob) => {
                // Try native share if available (mobile)
                if (navigator.canShare && navigator.canShare({ files: [new File([blob], filename, { type: 'image/png' })] })) {
                    try {
                        await navigator.share({
                            files: [new File([blob], filename, { type: 'image/png' })],
                            title: 'My Quantum Merlin Reading',
                            text: 'Check out my reading from Quantum Merlin!'
                        });
                        return;
                    } catch (e) {
                        // Fall through to download
                    }
                }
                
                // Fallback: download image
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                this.showCopyFeedback('✓ Image downloaded!');
            }, 'image/png');
            
        } catch (error) {
            console.error('Error creating image:', error);
            this.showCopyFeedback('❌ Could not create image');
        }
    },
    
    /**
     * Load html2canvas library dynamically
     */
    loadHtml2Canvas() {
        return new Promise((resolve, reject) => {
            if (typeof html2canvas !== 'undefined') {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },
    
    /**
     * Initialize share buttons on page
     */
    init() {
        // Add CSS animations
        if (!document.querySelector('#qm-share-styles')) {
            const style = document.createElement('style');
            style.id = 'qm-share-styles';
            style.textContent = `
                @keyframes qmFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes qmFadeOut { from { opacity: 1; } to { opacity: 0; } }
                @keyframes qmFadeInUp { 
                    from { opacity: 0; transform: translate(-50%, 20px); } 
                    to { opacity: 1; transform: translate(-50%, 0); } 
                }
                @keyframes qmFadeOutDown { 
                    from { opacity: 1; transform: translate(-50%, 0); } 
                    to { opacity: 0; transform: translate(-50%, 20px); } 
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => QMShare.init());
} else {
    QMShare.init();
}

/**
 * Create and inject a viral share card after reading results
 * @param {Object} options - Configuration for the share card
 */
QMShare.injectViralCard = function(options = {}) {
    const {
        container = '.reading-card, .result, #result',
        position = 'afterend',
        resultType = 'default',
        resultValue = '',
        resultLabel = 'Your Result'
    } = options;
    
    // Set current result for viral sharing
    this.setResult({
        type: resultType,
        value: resultValue,
        name: ''
    });
    
    const targetEl = document.querySelector(container);
    if (!targetEl) return;
    
    // Check if card already exists
    if (document.querySelector('.viral-share-card')) return;
    
    const viralText = this.getViralText();
    
    const cardHTML = `
    <div class="viral-share-card">
        <div class="viral-share-header">
            <span class="viral-emoji">�</span>
            <span class="viral-title">Share Your Cosmic Destiny!</span>
        </div>
        <div class="viral-preview">
            <div class="viral-quote">"${viralText}"</div>
        </div>
        <div class="viral-cta">Challenge your bias to discover theirs! 🌟</div>
        <div class="viral-buttons">
            <button class="viral-btn viral-btn-primary" onclick="QMShare.copyViralText()" title="Copy to share anywhere">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                Copy & Share
            </button>
            <button class="viral-btn viral-btn-tiktok" onclick="QMShare.tiktok()" title="Share on TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                TikTok
            </button>
            <button class="viral-btn viral-btn-instagram" onclick="QMShare.instagram()" title="Share on Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram
            </button>
            <button class="viral-btn" onclick="QMShare.twitter()" title="Share on X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </button>
            <button class="viral-btn" onclick="QMShare.whatsapp()" title="Share on WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </button>
        </div>
        <button class="viral-more-btn" onclick="this.parentElement.classList.toggle('show-more')">
            More ways to share ▾
        </button>
        <div class="viral-extra-buttons">
            <button class="viral-btn-small" onclick="QMShare.threads()" title="Threads">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.023.88-.73 2.088-1.146 3.396-1.272l.059-.004c.924-.065 1.78.024 2.553.265.193-.658.29-1.404.275-2.2-.043-2.355-1.32-3.652-3.59-3.652-1.453 0-2.548.49-3.255 1.458-.584.8-.905 1.893-.958 3.255l-2.073-.086c.072-1.753.518-3.2 1.327-4.305 1.036-1.418 2.64-2.167 4.77-2.228h.1c3.327 0 5.483 2.098 5.536 5.39.028 1.203-.168 2.318-.574 3.32 1.072.589 1.9 1.405 2.418 2.4.734 1.408.927 3.17.543 4.962-.493 2.304-1.857 4.03-3.946 4.996-1.59.734-3.482 1.1-5.632 1.092zm1.083-7.409c-1.456.132-2.912.696-2.866 1.89.023.602.357 1.063.968 1.334.532.236 1.222.316 1.94.225 1.04-.131 2.468-.725 2.812-3.418-.627-.177-1.282-.245-1.932-.2h-.022l-.9.07z"/></svg>
                Threads
            </button>
            <button class="viral-btn-small" onclick="QMShare.telegram()" title="Telegram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Telegram
            </button>
            <button class="viral-btn-small" onclick="QMShare.reddit()" title="Reddit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
                Reddit
            </button>
            <button class="viral-btn-small" onclick="QMShare.facebook()" title="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
            </button>
            <button class="viral-btn-small" onclick="QMShare.pinterest()" title="Pinterest">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                Pinterest
            </button>
            <button class="viral-btn-small" onclick="QMShare.email()" title="Email">✉️ Email</button>
            <button class="viral-btn-small" onclick="QMShare.sms()" title="SMS">💬 Text</button>
        </div>
    </div>
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#viral-share-styles')) {
        const style = document.createElement('style');
        style.id = 'viral-share-styles';
        style.textContent = `
            .viral-share-card {
                background: linear-gradient(135deg, rgba(255, 107, 157, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
                border: 2px solid rgba(255, 107, 157, 0.5);
                border-radius: 20px;
                padding: 25px;
                margin: 30px 0;
                text-align: center;
                animation: viralPulse 3s ease-in-out infinite;
            }
            @keyframes viralPulse {
                0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 157, 0.3); }
                50% { box-shadow: 0 0 30px rgba(255, 107, 157, 0.5); }
            }
            .viral-share-header {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                margin-bottom: 15px;
            }
            .viral-emoji { font-size: 1.8em; }
            .viral-title {
                font-family: 'Cinzel Decorative', serif;
                font-size: 1.4em;
                background: linear-gradient(135deg, #FF6B9D 0%, #A855F7 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .viral-preview {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 12px;
                padding: 15px 20px;
                margin: 15px 0;
            }
            .viral-quote {
                font-family: 'Poppins', sans-serif;
                font-size: 1.1em;
                font-style: italic;
                color: #FF6B9D;
                line-height: 1.5;
            }
            .viral-cta {
                color: #9ca3af;
                font-size: 0.95em;
                margin-bottom: 20px;
            }
            .viral-buttons {
                display: flex;
                gap: 8px;
                justify-content: center;
                flex-wrap: wrap;
            }
            .viral-btn {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                padding: 10px 14px;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 0.85em;
                font-weight: 500;
            }
            .viral-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }
            .viral-btn-primary {
                background: linear-gradient(135deg, #FF6B9D 0%, #A855F7 100%);
                border: none;
                color: white;
                font-weight: 600;
                padding: 12px 20px;
            }
            .viral-btn-primary:hover {
                background: linear-gradient(135deg, #FF8AB3 0%, #B877F7 100%);
                box-shadow: 0 5px 20px rgba(255, 107, 157, 0.4);
            }
            .viral-btn-tiktok {
                background: rgba(0, 0, 0, 0.3);
                border-color: rgba(255, 255, 255, 0.3);
            }
            .viral-btn-tiktok:hover {
                background: rgba(0, 0, 0, 0.5);
                box-shadow: 0 3px 15px rgba(255, 255, 255, 0.2);
            }
            .viral-btn-instagram {
                background: linear-gradient(135deg, #833AB4 0%, #C13584 50%, #FD1D1D 100%);
                border: none;
            }
            .viral-btn-instagram:hover {
                background: linear-gradient(135deg, #9B4AC4 0%, #D14594 50%, #FF3D3D 100%);
                box-shadow: 0 3px 15px rgba(193, 53, 132, 0.4);
            }
            .viral-more-btn {
                background: none;
                border: none;
                color: #6b7280;
                font-size: 0.85em;
                cursor: pointer;
                margin-top: 15px;
                padding: 8px 16px;
                transition: color 0.3s;
            }
            .viral-more-btn:hover { color: #9ca3af; }
            .viral-extra-buttons {
                display: none;
                flex-wrap: wrap;
                gap: 8px;
                justify-content: center;
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            .viral-share-card.show-more .viral-extra-buttons { display: flex; }
            .viral-share-card.show-more .viral-more-btn { display: none; }
            .viral-btn-small {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #9ca3af;
                padding: 8px 14px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.85em;
                transition: all 0.2s;
            }
            .viral-btn-small:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
        `;
        document.head.appendChild(style);
    }
    
    targetEl.insertAdjacentHTML(position, cardHTML);
};

// Legacy function aliases for backward compatibility
function shareOnTwitter(text, url) {
    QMShare.twitter(text, url);
}

function shareOnFacebook(url) {
    QMShare.facebook(url);
}

function copyLink(url) {
    QMShare.copyLink(url);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QMShare;
}
