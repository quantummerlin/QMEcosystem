/**
 * Quantum Playlist System
 * Sequential frequency playback with transitions
 */

class QuantumPlaylistSystem {
    constructor(audioEngine) {
        this.audioEngine = audioEngine;
        this.currentPlaylist = null;
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.transitionDuration = 5; // seconds
        this.trackTimer = null;
        this.onTrackChange = null;
        this.onPlaylistComplete = null;
        
        // Preset playlists
        this.presets = {
            morning: {
                name: "Morning Awakening",
                description: "Energizing frequencies to start your day with vitality and focus",
                icon: "🌅",
                duration: 7200, // 2 hours
                tracks: [
                    'schumann-earth-resonance',
                    'morning-energy',
                    'beta-productivity-18hz',
                    'gamma-focus-40hz',
                    'creative-flow',
                    'confidence-boost'
                ]
            },
            work: {
                name: "Deep Work Session",
                description: "Sustained focus and productivity for 4-6 hours of deep work",
                icon: "💼",
                duration: 21600, // 6 hours
                tracks: [
                    'gamma-focus-40hz',
                    'beta-productivity-18hz',
                    'study-focus',
                    'creative-flow',
                    'gamma-focus-40hz',
                    'alpha-relaxation-10hz'
                ]
            },
            evening: {
                name: "Evening Wind Down",
                description: "Gentle transition from day to night with relaxing frequencies",
                icon: "🌆",
                duration: 7200, // 2 hours
                tracks: [
                    'alpha-relaxation-10hz',
                    'stress-release',
                    'anxiety-relief',
                    'theta-meditation-6hz',
                    'schumann-earth-resonance'
                ]
            },
            sleep: {
                name: "Deep Sleep Journey",
                description: "8-hour sleep optimization with delta waves and healing frequencies",
                icon: "🌙",
                duration: 28800, // 8 hours
                tracks: [
                    'anxiety-relief',
                    'theta-meditation-6hz',
                    'deep-delta-sleep',
                    'deep-delta-sleep',
                    'deep-delta-sleep',
                    'power-nap'
                ]
            },
            abundance: {
                name: "Abundance Amplifier",
                description: "4-hour wealth manifestation journey with signature frequencies",
                icon: "💰",
                duration: 14400, // 4 hours
                tracks: [
                    'amplified-abundance',
                    'manifest-money-37-73',
                    'manifestation-power',
                    'financial-freedom',
                    'amplified-abundance',
                    'confidence-boost'
                ]
            },
            healing: {
                name: "Complete Healing Session",
                description: "6-hour deep healing with DNA repair and cellular regeneration",
                icon: "💚",
                duration: 21600, // 6 hours
                tracks: [
                    '528-love-miracle',
                    'dna-repair-528',
                    'deep-healing',
                    'immune-boost',
                    'healing-174hz',
                    'schumann-earth-resonance'
                ]
            },
            meditation: {
                name: "Spiritual Journey",
                description: "3-hour meditation with theta, chakra alignment, and higher consciousness",
                icon: "🧘",
                duration: 10800, // 3 hours
                tracks: [
                    'schumann-earth-resonance',
                    'theta-meditation-6hz',
                    'chakra-alignment',
                    '963-pineal-activation',
                    'third-eye-852',
                    'theta-meditation-6hz'
                ]
            },
            relationship: {
                name: "Love & Connection",
                description: "2-hour heart opening and relationship harmony frequencies",
                icon: "💕",
                duration: 7200, // 2 hours
                tracks: [
                    '528-love-miracle',
                    'heart-chakra-639',
                    'relationship-harmony',
                    'confidence-boost',
                    '528-love-miracle'
                ]
            }
        };
    }
    
    /**
     * Load a preset playlist
     */
    loadPreset(presetName) {
        const preset = this.presets[presetName];
        if (!preset) {
            console.error('Preset not found:', presetName);
            return false;
        }
        
        // Create playlist from preset
        this.currentPlaylist = {
            name: preset.name,
            description: preset.description,
            icon: preset.icon,
            tracks: preset.tracks.map(trackId => {
                const track = FrequencyDatabase.getTrackById(trackId);
                if (!track) {
                    console.warn('Track not found:', trackId);
                    return null;
                }
                return track;
            }).filter(track => track !== null),
            totalDuration: preset.duration,
            currentTime: 0
        };
        
        this.currentTrackIndex = 0;
        console.log('✅ Loaded preset playlist:', preset.name);
        return true;
    }
    
    /**
     * Create custom playlist from track IDs
     */
    createCustomPlaylist(name, trackIds, description = '') {
        this.currentPlaylist = {
            name: name,
            description: description,
            icon: '🎵',
            tracks: trackIds.map(trackId => {
                const track = FrequencyDatabase.getTrackById(trackId);
                if (!track) {
                    console.warn('Track not found:', trackId);
                    return null;
                }
                return track;
            }).filter(track => track !== null),
            totalDuration: 0,
            currentTime: 0,
            custom: true
        };
        
        // Calculate total duration
        this.currentPlaylist.totalDuration = this.currentPlaylist.tracks.reduce(
            (sum, track) => sum + track.duration, 0
        );
        
        this.currentTrackIndex = 0;
        console.log('✅ Created custom playlist:', name);
        return true;
    }
    
    /**
     * Start playlist playback
     */
    play() {
        if (!this.currentPlaylist || this.currentPlaylist.tracks.length === 0) {
            console.error('No playlist loaded');
            return false;
        }
        
        if (this.isPlaying) {
            console.warn('Playlist already playing');
            return false;
        }
        
        this.isPlaying = true;
        this.playCurrentTrack();
        console.log('▶️ Playlist started:', this.currentPlaylist.name);
        return true;
    }
    
    /**
     * Pause playlist playback
     */
    pause() {
        if (!this.isPlaying) return;
        
        this.isPlaying = false;
        this.audioEngine.stopAll();
        
        if (this.trackTimer) {
            clearTimeout(this.trackTimer);
            this.trackTimer = null;
        }
        
        console.log('⏸️ Playlist paused');
    }
    
    /**
     * Stop playlist playback
     */
    stop() {
        this.pause();
        this.currentTrackIndex = 0;
        this.currentPlaylist.currentTime = 0;
        console.log('⏹️ Playlist stopped');
    }
    
    /**
     * Skip to next track
     */
    next() {
        if (!this.currentPlaylist) return;
        
        this.currentTrackIndex++;
        
        if (this.currentTrackIndex >= this.currentPlaylist.tracks.length) {
            // Playlist complete
            this.onPlaylistComplete && this.onPlaylistComplete();
            this.stop();
            console.log('✅ Playlist complete');
            return;
        }
        
        if (this.isPlaying) {
            this.playCurrentTrack();
        }
    }
    
    /**
     * Skip to previous track
     */
    previous() {
        if (!this.currentPlaylist) return;
        
        this.currentTrackIndex = Math.max(0, this.currentTrackIndex - 1);
        
        if (this.isPlaying) {
            this.playCurrentTrack();
        }
    }
    
    /**
     * Play current track with transition
     */
    playCurrentTrack() {
        if (!this.currentPlaylist) return;
        
        const track = this.currentPlaylist.tracks[this.currentTrackIndex];
        if (!track) return;
        
        // Fade out current track
        if (this.audioEngine.isPlaying) {
            this.audioEngine.fadeOut(this.transitionDuration);
        }
        
        // Wait for fade out, then load new track
        setTimeout(() => {
            // Load track preset
            this.audioEngine.loadPreset({
                name: track.name,
                frequencies: track.frequencies,
                waveforms: track.waveforms,
                volumes: track.volumes
            });
            
            // Start playback with fade in
            this.audioEngine.startAll();
            this.audioEngine.fadeIn(this.transitionDuration);
            
            // Notify track change
            this.onTrackChange && this.onTrackChange(track, this.currentTrackIndex);
            
            console.log(`🎵 Now playing: ${track.name} (${this.currentTrackIndex + 1}/${this.currentPlaylist.tracks.length})`);
            
            // Schedule next track
            if (this.isPlaying) {
                this.scheduleNextTrack(track.duration);
            }
        }, this.transitionDuration * 1000);
    }
    
    /**
     * Schedule next track to play
     */
    scheduleNextTrack(duration) {
        if (this.trackTimer) {
            clearTimeout(this.trackTimer);
        }
        
        this.trackTimer = setTimeout(() => {
            this.next();
        }, duration * 1000);
    }
    
    /**
     * Get current track
     */
    getCurrentTrack() {
        if (!this.currentPlaylist) return null;
        return this.currentPlaylist.tracks[this.currentTrackIndex];
    }
    
    /**
     * Get playlist progress
     */
    getProgress() {
        if (!this.currentPlaylist) return { current: 0, total: 0, percentage: 0 };
        
        const elapsed = this.currentPlaylist.tracks
            .slice(0, this.currentTrackIndex)
            .reduce((sum, track) => sum + track.duration, 0);
        
        return {
            current: elapsed,
            total: this.currentPlaylist.totalDuration,
            percentage: (elapsed / this.currentPlaylist.totalDuration) * 100,
            currentTrack: this.currentTrackIndex + 1,
            totalTracks: this.currentPlaylist.tracks.length
        };
    }
    
    /**
     * Get all preset playlists
     */
    getPresets() {
        return Object.keys(this.presets).map(key => ({
            id: key,
            ...this.presets[key]
        }));
    }
    
    /**
     * Save current playlist
     */
    savePlaylist() {
        if (!this.currentPlaylist) return null;
        
        const playlistData = {
            type: 'quantum_playlist',
            timestamp: new Date().toISOString(),
            name: this.currentPlaylist.name,
            description: this.currentPlaylist.description,
            icon: this.currentPlaylist.icon,
            trackIds: this.currentPlaylist.tracks.map(track => track.id),
            duration: this.currentPlaylist.totalDuration,
            custom: this.currentPlaylist.custom || false
        };
        
        // Save to localStorage
        if (typeof QuantumStorage !== 'undefined') {
            QuantumStorage.savePlaylist(playlistData);
            console.log('💾 Playlist saved:', playlistData.name);
        }
        
        return playlistData;
    }
    
    /**
     * Export playlist as JSON
     */
    exportPlaylist() {
        if (!this.currentPlaylist) return null;
        
        const exportData = {
            name: this.currentPlaylist.name,
            description: this.currentPlaylist.description,
            icon: this.currentPlaylist.icon,
            tracks: this.currentPlaylist.tracks.map(track => ({
                id: track.id,
                name: track.name,
                frequencies: track.frequencies,
                waveforms: track.waveforms,
                volumes: track.volumes,
                duration: track.duration
            })),
            totalDuration: this.currentPlaylist.totalDuration,
            createdAt: new Date().toISOString()
        };
        
        return exportData;
    }
    
    /**
     * Set transition duration
     */
    setTransitionDuration(seconds) {
        this.transitionDuration = Math.max(1, Math.min(10, seconds));
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumPlaylistSystem;
}