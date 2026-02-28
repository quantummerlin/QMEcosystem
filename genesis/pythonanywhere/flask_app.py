"""
Genesis Frequency Generator - License Validation API
Deploy this to PythonAnywhere

Your API URL: https://QuantumMerlin.com/Genesis
(Proxied from: https://majesticmerlin.pythonanywhere.com)
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow requests from your GitHub Pages site

# Database path - PythonAnywhere uses this location
DB_PATH = '/home/majesticmerlin/genesis_licenses.db'

def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database tables"""
    conn = get_db()
    cursor = conn.cursor()
    
    # License keys table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS licenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            license_key TEXT UNIQUE NOT NULL,
            tier TEXT NOT NULL,
            email TEXT,
            etsy_order_id TEXT,
            max_devices INTEGER DEFAULT 5,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active INTEGER DEFAULT 1
        )
    ''')
    
    # Device activations table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS activations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            license_key TEXT NOT NULL,
            device_fingerprint TEXT NOT NULL,
            device_info TEXT,
            activated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(license_key, device_fingerprint)
        )
    ''')
    
    # Validation attempts (for rate limiting and analytics)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS validation_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            license_key TEXT,
            device_fingerprint TEXT,
            success INTEGER,
            error_message TEXT,
            ip_address TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Affiliate interest signups
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS affiliate_interests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            ip_address TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        'status': 'online',
        'service': 'Genesis Frequency Generator License API',
        'version': '1.0.0'
    })

@app.route('/api/affiliate-interest', methods=['POST'])
def affiliate_interest():
    """Collect email for affiliate program interest"""
    try:
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        ip_address = request.remote_addr
        
        if not email or '@' not in email:
            return jsonify({'error': 'Invalid email'}), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        try:
            cursor.execute('''
                INSERT INTO affiliate_interests (email, ip_address)
                VALUES (?, ?)
            ''', (email, ip_address))
            conn.commit()
        except sqlite3.IntegrityError:
            # Email already exists
            pass
        
        conn.close()
        
        return jsonify({'success': True, 'message': 'Thanks for your interest!'})
        
    except Exception as e:
        return jsonify({'error': 'Server error'}), 500

@app.route('/admin/list-affiliates', methods=['POST'])
def list_affiliates():
    """List all affiliate interest signups (admin only)"""
    try:
        data = request.get_json()
        admin_key = data.get('admin_key', '')
        
        if admin_key != 'QuantumMerlin119':
            return jsonify({'error': 'Unauthorized'}), 401
        
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM affiliate_interests ORDER BY created_at DESC')
        
        affiliates = []
        for row in cursor.fetchall():
            affiliates.append({
                'email': row['email'],
                'created_at': row['created_at']
            })
        
        conn.close()
        return jsonify({'affiliates': affiliates, 'count': len(affiliates)})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/validate', methods=['POST'])
def validate_license():
    """
    Validate a license key and activate on device
    
    Request body:
    {
        "license_key": "GFGN-PREM-1234-5678",
        "device_fingerprint": "abc123xyz",
        "device_info": "Chrome/Windows"
    }
    
    Response:
    {
        "valid": true,
        "tier": "premium",
        "message": "License activated successfully",
        "devices_used": 1,
        "devices_max": 3
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'valid': False,
                'error': 'No data provided'
            }), 400
        
        license_key = data.get('license_key', '').strip().upper()
        device_fingerprint = data.get('device_fingerprint', '')
        device_info = data.get('device_info', 'Unknown')
        ip_address = request.remote_addr
        
        # Validate license key format
        if not license_key:
            log_validation(license_key, device_fingerprint, False, 'Empty license key', ip_address)
            return jsonify({
                'valid': False,
                'error': 'Please enter a license key'
            }), 400
        
        # Check format: QMFG-XXXX-XXXX-XXXX
        parts = license_key.split('-')
        if len(parts) != 4 or parts[0] != 'QMFG':
            log_validation(license_key, device_fingerprint, False, 'Invalid format', ip_address)
            return jsonify({
                'valid': False,
                'error': 'Invalid license key format. Use: QMFG-XXXX-XXXX-XXXX'
            }), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Look up license key
        cursor.execute('''
            SELECT * FROM licenses WHERE license_key = ? AND is_active = 1
        ''', (license_key,))
        
        license_row = cursor.fetchone()
        
        if not license_row:
            log_validation(license_key, device_fingerprint, False, 'Key not found', ip_address)
            conn.close()
            return jsonify({
                'valid': False,
                'error': 'License key not found. Please check your key or purchase on Etsy.'
            }), 404
        
        tier = license_row['tier']
        max_devices = license_row['max_devices']
        
        # Check device activations
        cursor.execute('''
            SELECT COUNT(*) as count FROM activations WHERE license_key = ?
        ''', (license_key,))
        
        device_count = cursor.fetchone()['count']
        
        # Check if this device is already activated
        cursor.execute('''
            SELECT * FROM activations 
            WHERE license_key = ? AND device_fingerprint = ?
        ''', (license_key, device_fingerprint))
        
        existing_activation = cursor.fetchone()
        
        if existing_activation:
            # Device already activated - update last seen
            cursor.execute('''
                UPDATE activations SET last_seen = ? 
                WHERE license_key = ? AND device_fingerprint = ?
            ''', (datetime.now(), license_key, device_fingerprint))
            conn.commit()
            
            log_validation(license_key, device_fingerprint, True, 'Already activated', ip_address)
            conn.close()
            
            return jsonify({
                'valid': True,
                'tier': tier,
                'message': 'License verified successfully',
                'devices_used': device_count,
                'devices_max': max_devices,
                'already_activated': True
            })
        
        # New device - check if limit reached
        if device_count >= max_devices:
            log_validation(license_key, device_fingerprint, False, 'Device limit reached', ip_address)
            conn.close()
            return jsonify({
                'valid': False,
                'error': f'Device limit reached ({max_devices} devices). Contact support to reset devices.',
                'devices_used': device_count,
                'devices_max': max_devices
            }), 403
        
        # Activate on new device
        cursor.execute('''
            INSERT INTO activations (license_key, device_fingerprint, device_info)
            VALUES (?, ?, ?)
        ''', (license_key, device_fingerprint, device_info))
        
        conn.commit()
        
        log_validation(license_key, device_fingerprint, True, 'New activation', ip_address)
        conn.close()
        
        return jsonify({
            'valid': True,
            'tier': tier,
            'message': 'License activated successfully!',
            'devices_used': device_count + 1,
            'devices_max': max_devices,
            'already_activated': False
        })
        
    except Exception as e:
        return jsonify({
            'valid': False,
            'error': 'Server error. Please try again later.'
        }), 500

@app.route('/api/check', methods=['POST'])
def check_activation():
    """
    Check if a device is already activated (for page load)
    
    Request body:
    {
        "license_key": "GFGN-PREM-1234-5678",
        "device_fingerprint": "abc123xyz"
    }
    """
    try:
        data = request.get_json()
        license_key = data.get('license_key', '').strip().upper()
        device_fingerprint = data.get('device_fingerprint', '')
        
        if not license_key or not device_fingerprint:
            return jsonify({'activated': False})
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Check if this device is activated for this key
        cursor.execute('''
            SELECT l.tier, l.max_devices,
                   (SELECT COUNT(*) FROM activations WHERE license_key = l.license_key) as devices_used
            FROM licenses l
            JOIN activations a ON l.license_key = a.license_key
            WHERE l.license_key = ? AND a.device_fingerprint = ? AND l.is_active = 1
        ''', (license_key, device_fingerprint))
        
        row = cursor.fetchone()
        conn.close()
        
        if row:
            return jsonify({
                'activated': True,
                'tier': row['tier'],
                'devices_used': row['devices_used'],
                'devices_max': row['max_devices']
            })
        
        return jsonify({'activated': False})
        
    except Exception as e:
        return jsonify({'activated': False})

@app.route('/api/deactivate', methods=['POST'])
def deactivate_device():
    """
    Deactivate a specific device (for customer support)
    Requires admin_key for security
    """
    try:
        data = request.get_json()
        admin_key = data.get('admin_key', '')
        license_key = data.get('license_key', '').strip().upper()
        device_fingerprint = data.get('device_fingerprint', '')
        
        # Simple admin authentication
        if admin_key != 'QuantumMerlin119':
            return jsonify({'error': 'Unauthorized'}), 401
        
        conn = get_db()
        cursor = conn.cursor()
        
        if device_fingerprint:
            # Deactivate specific device
            cursor.execute('''
                DELETE FROM activations 
                WHERE license_key = ? AND device_fingerprint = ?
            ''', (license_key, device_fingerprint))
        else:
            # Deactivate all devices for this key
            cursor.execute('''
                DELETE FROM activations WHERE license_key = ?
            ''', (license_key,))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Device(s) deactivated successfully'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def log_validation(license_key, device_fingerprint, success, message, ip_address):
    """Log validation attempt for analytics and security"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO validation_log (license_key, device_fingerprint, success, error_message, ip_address)
            VALUES (?, ?, ?, ?, ?)
        ''', (license_key, device_fingerprint, 1 if success else 0, message, ip_address))
        conn.commit()
        conn.close()
    except:
        pass  # Don't fail validation if logging fails

# ============================================
# ADMIN ENDPOINTS (for managing licenses)
# ============================================

@app.route('/admin/add-license', methods=['POST'])
def add_license():
    """
    Add a new license key (for when you make a sale on Etsy)
    
    Request body:
    {
        "admin_key": "YOUR_SECRET_ADMIN_KEY",
        "license_key": "GFGN-PREM-1234-5678",
        "tier": "premium",
        "email": "customer@email.com",
        "etsy_order_id": "123456789"
    }
    """
    try:
        data = request.get_json()
        admin_key = data.get('admin_key', '')
        
        # Simple admin authentication - CHANGE THIS KEY!
        if admin_key != 'QuantumMerlin119':
            return jsonify({'error': 'Unauthorized'}), 401
        
        license_key = data.get('license_key', '').strip().upper()
        tier = data.get('tier', 'premium').lower()
        email = data.get('email', '')
        etsy_order_id = data.get('etsy_order_id', '')
        max_devices = data.get('max_devices', 5)
        
        if tier not in ['premium', 'ultimate']:
            return jsonify({'error': 'Tier must be "premium" or "ultimate"'}), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO licenses (license_key, tier, email, etsy_order_id, max_devices)
            VALUES (?, ?, ?, ?, ?)
        ''', (license_key, tier, email, etsy_order_id, max_devices))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': f'{tier.capitalize()} license created: {license_key}'
        })
        
    except sqlite3.IntegrityError:
        return jsonify({'error': 'License key already exists'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/admin/list-licenses', methods=['POST'])
def list_licenses():
    """List all licenses (admin only)"""
    try:
        data = request.get_json()
        admin_key = data.get('admin_key', '')
        
        if admin_key != 'QuantumMerlin119':
            return jsonify({'error': 'Unauthorized'}), 401
        
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT l.*, 
                   (SELECT COUNT(*) FROM activations WHERE license_key = l.license_key) as devices_used
            FROM licenses l
            ORDER BY created_at DESC
        ''')
        
        licenses = []
        for row in cursor.fetchall():
            licenses.append({
                'license_key': row['license_key'],
                'tier': row['tier'],
                'email': row['email'],
                'etsy_order_id': row['etsy_order_id'],
                'max_devices': row['max_devices'],
                'devices_used': row['devices_used'],
                'is_active': bool(row['is_active']),
                'created_at': row['created_at']
            })
        
        conn.close()
        
        return jsonify({'licenses': licenses})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/admin/generate-key', methods=['POST'])
def generate_key():
    """Generate a new license key"""
    try:
        data = request.get_json()
        admin_key = data.get('admin_key', '')
        
        if admin_key != 'QuantumMerlin119':
            return jsonify({'error': 'Unauthorized'}), 401
        
        tier = data.get('tier', 'premium').lower()
        
        import random
        import string
        
        def random_segment():
            return ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
        
        # Generate key with tier prefix
        if tier == 'ultimate':
            prefix = 'ULTI'
        else:
            prefix = 'PREM'
        
        license_key = f"QMFG-{prefix}-{random_segment()}-{random_segment()}"
        
        return jsonify({
            'license_key': license_key,
            'tier': tier
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/admin/toggle-license', methods=['POST'])
def toggle_license():
    """Activate or deactivate a license"""
    try:
        data = request.get_json()
        admin_key = data.get('admin_key', '')
        
        if admin_key != 'QuantumMerlin119':
            return jsonify({'error': 'Unauthorized'}), 401
        
        license_key = data.get('license_key', '').strip().upper()
        is_active = data.get('is_active', True)
        
        conn = get_db()
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE licenses SET is_active = ? WHERE license_key = ?
        ''', (1 if is_active else 0, license_key))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': f'License {"activated" if is_active else "deactivated"}'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/admin/delete-license', methods=['POST'])
def delete_license():
    """Permanently delete a license and all its activations"""
    try:
        data = request.get_json()
        admin_key = data.get('admin_key', '')
        
        if admin_key != 'QuantumMerlin119':
            return jsonify({'error': 'Unauthorized'}), 401
        
        license_key = data.get('license_key', '').strip().upper()
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Delete activations first
        cursor.execute('DELETE FROM activations WHERE license_key = ?', (license_key,))
        
        # Delete the license
        cursor.execute('DELETE FROM licenses WHERE license_key = ?', (license_key,))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'License deleted permanently'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
