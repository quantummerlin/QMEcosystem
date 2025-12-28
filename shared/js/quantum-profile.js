/**
 * Quantum Merlin User Profile System
 * Cross-tool data sharing and synchronization
 * Allows all tools to access and use user's saved information
 */

(function() {
    'use strict';

    const QM_USER_PROFILE_KEY = 'qm_user_profile';
    const QM_LIBRARY_KEY = 'qm_library';
    const LEGACY_JUKEBOX_KEY = 'quantumJukebox';
    const LEGACY_INSIGHTS_KEY = 'quantumMerlinInsights';
    const MIGRATION_FLAG = 'qm_storage_migrated';

    /**
     * Migrate legacy storage to unified qm_library
     * Runs once on first load after update
     */
    function migrateStorage() {
        // Check if already migrated
        if (localStorage.getItem(MIGRATION_FLAG)) {
            return;
        }

        console.log('🔄 Migrating Quantum Merlin storage...');
        
        let existingLibrary = [];
        
        // Get existing qm_library items if any
        try {
            const existing = localStorage.getItem(QM_LIBRARY_KEY);
            if (existing) {
                existingLibrary = JSON.parse(existing);
            }
        } catch (e) {
            console.error('Error reading existing library:', e);
        }

        // Migrate from quantumJukebox (legacy main storage)
        try {
            const jukeboxData = localStorage.getItem(LEGACY_JUKEBOX_KEY);
            if (jukeboxData) {
                const jukeboxItems = JSON.parse(jukeboxData);
                if (Array.isArray(jukeboxItems) && jukeboxItems.length > 0) {
                    // Merge, avoiding duplicates by timestamp
                    const existingTimestamps = new Set(existingLibrary.map(item => item.timestamp));
                    jukeboxItems.forEach(item => {
                        if (!existingTimestamps.has(item.timestamp)) {
                            existingLibrary.push(item);
                        }
                    });
                    console.log(`✅ Migrated ${jukeboxItems.length} items from quantumJukebox`);
                }
            }
        } catch (e) {
            console.error('Error migrating quantumJukebox:', e);
        }

        // Migrate from quantumMerlinInsights (legacy Expand tools)
        try {
            const insightsData = localStorage.getItem(LEGACY_INSIGHTS_KEY);
            if (insightsData) {
                const insightsItems = JSON.parse(insightsData);
                if (Array.isArray(insightsItems) && insightsItems.length > 0) {
                    const existingTimestamps = new Set(existingLibrary.map(item => item.timestamp));
                    insightsItems.forEach(item => {
                        if (!existingTimestamps.has(item.timestamp)) {
                            existingLibrary.push(item);
                        }
                    });
                    console.log(`✅ Migrated ${insightsItems.length} items from quantumMerlinInsights`);
                }
            }
        } catch (e) {
            console.error('Error migrating quantumMerlinInsights:', e);
        }

        // Sort by timestamp (newest first)
        existingLibrary.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        // Save unified library
        localStorage.setItem(QM_LIBRARY_KEY, JSON.stringify(existingLibrary));
        
        // Mark migration complete
        localStorage.setItem(MIGRATION_FLAG, Date.now().toString());
        
        console.log(`✨ Storage migration complete. Total items: ${existingLibrary.length}`);
    }

    // Run migration on load
    migrateStorage();

    /**
     * User Profile Manager
     */
    window.QuantumMerlinProfile = {
        /**
         * Get the complete user profile
         */
        getProfile: function() {
            try {
                const profile = localStorage.getItem(QM_USER_PROFILE_KEY);
                return profile ? JSON.parse(profile) : this.getDefaultProfile();
            } catch (error) {
                console.error('Error loading profile:', error);
                return this.getDefaultProfile();
            }
        },

        /**
         * Default profile structure
         */
        getDefaultProfile: function() {
            return {
                personal: {
                    name: '',
                    birthDate: '',
                    birthTime: '',
                    birthPlace: '',
                    latitude: null,
                    longitude: null,
                    timezone: ''
                },
                astrology: {
                    sunSign: '',
                    moonSign: '',
                    risingSign: '',
                    planets: {}
                },
                preferences: {
                    theme: 'dark',
                    notifications: true,
                    autoSave: true
                },
                metadata: {
                    created: new Date().toISOString(),
                    lastUpdated: new Date().toISOString(),
                    version: '1.0'
                }
            };
        },

        /**
         * Save the entire profile
         */
        saveProfile: function(profile) {
            try {
                profile.metadata.lastUpdated = new Date().toISOString();
                localStorage.setItem(QM_USER_PROFILE_KEY, JSON.stringify(profile));
                return true;
            } catch (error) {
                console.error('Error saving profile:', error);
                return false;
            }
        },

        /**
         * Update specific profile fields
         */
        updateProfile: function(updates) {
            const profile = this.getProfile();
            
            // Merge updates into profile
            if (updates.personal) {
                Object.assign(profile.personal, updates.personal);
            }
            if (updates.astrology) {
                Object.assign(profile.astrology, updates.astrology);
            }
            if (updates.preferences) {
                Object.assign(profile.preferences, updates.preferences);
            }
            
            return this.saveProfile(profile);
        },

        /**
         * Get personal information
         */
        getPersonalInfo: function() {
            return this.getProfile().personal;
        },

        /**
         * Save personal information (used when user enters birth data)
         */
        savePersonalInfo: function(info) {
            return this.updateProfile({ personal: info });
        },

        /**
         * Check if user has entered their birth information
         */
        hasBirthInfo: function() {
            const personal = this.getPersonalInfo();
            return !!(personal.birthDate && personal.birthTime && personal.birthPlace);
        },

        /**
         * Auto-fill form fields with saved profile data
         */
        autoFillForm: function(formSelectors) {
            const personal = this.getPersonalInfo();
            
            if (formSelectors.name && personal.name) {
                const nameField = document.querySelector(formSelectors.name);
                if (nameField && !nameField.value) nameField.value = personal.name;
            }
            
            if (formSelectors.birthDate && personal.birthDate) {
                const dateField = document.querySelector(formSelectors.birthDate);
                if (dateField && !dateField.value) dateField.value = personal.birthDate;
            }
            
            if (formSelectors.birthTime && personal.birthTime) {
                const timeField = document.querySelector(formSelectors.birthTime);
                if (timeField && !timeField.value) timeField.value = personal.birthTime;
            }
            
            if (formSelectors.birthPlace && personal.birthPlace) {
                const placeField = document.querySelector(formSelectors.birthPlace);
                if (placeField && !placeField.value) placeField.value = personal.birthPlace;
            }
        },

        /**
         * Capture form data and save to profile
         */
        captureFormData: function(formSelectors) {
            const personal = {};
            
            if (formSelectors.name) {
                const nameField = document.querySelector(formSelectors.name);
                if (nameField && nameField.value) personal.name = nameField.value;
            }
            
            if (formSelectors.birthDate) {
                const dateField = document.querySelector(formSelectors.birthDate);
                if (dateField && dateField.value) personal.birthDate = dateField.value;
            }
            
            if (formSelectors.birthTime) {
                const timeField = document.querySelector(formSelectors.birthTime);
                if (timeField && timeField.value) personal.birthTime = timeField.value;
            }
            
            if (formSelectors.birthPlace) {
                const placeField = document.querySelector(formSelectors.birthPlace);
                if (placeField && placeField.value) personal.birthPlace = placeField.value;
            }
            
            if (formSelectors.latitude && formSelectors.longitude) {
                const latField = document.querySelector(formSelectors.latitude);
                const lonField = document.querySelector(formSelectors.longitude);
                if (latField && latField.value) personal.latitude = parseFloat(latField.value);
                if (lonField && lonField.value) personal.longitude = parseFloat(lonField.value);
            }
            
            return this.savePersonalInfo(personal);
        },

        /**
         * Clear all profile data
         */
        clearProfile: function() {
            try {
                localStorage.removeItem(QM_USER_PROFILE_KEY);
                return true;
            } catch (error) {
                console.error('Error clearing profile:', error);
                return false;
            }
        }
    };

    /**
     * Library Manager (for saved items)
     */
    window.QuantumMerlinLibrary = {
        /**
         * Get all library items
         */
        getItems: function() {
            try {
                const items = localStorage.getItem(QM_LIBRARY_KEY);
                return items ? JSON.parse(items) : [];
            } catch (error) {
                console.error('Error loading library:', error);
                return [];
            }
        },

        /**
         * Save an item to the library
         */
        saveItem: function(item) {
            try {
                const library = this.getItems();
                
                // Add timestamp if not present
                if (!item.timestamp) {
                    item.timestamp = Date.now();
                }
                
                // Add to library
                library.push(item);
                
                // Save to localStorage
                localStorage.setItem(QM_LIBRARY_KEY, JSON.stringify(library));
                return true;
            } catch (error) {
                console.error('Error saving to library:', error);
                return false;
            }
        },

        /**
         * Get items by type
         */
        getItemsByType: function(type) {
            return this.getItems().filter(item => item.type === type);
        },

        /**
         * Delete an item
         */
        deleteItem: function(timestamp) {
            try {
                const library = this.getItems();
                const filtered = library.filter(item => item.timestamp !== timestamp);
                localStorage.setItem(QM_LIBRARY_KEY, JSON.stringify(filtered));
                return true;
            } catch (error) {
                console.error('Error deleting item:', error);
                return false;
            }
        },

        /**
         * Clear all library items
         */
        clearLibrary: function() {
            try {
                localStorage.removeItem(QM_LIBRARY_KEY);
                return true;
            } catch (error) {
                console.error('Error clearing library:', error);
                return false;
            }
        }
    };

    // Make available globally
    console.log('✨ Quantum Merlin Profile System loaded');

})();
