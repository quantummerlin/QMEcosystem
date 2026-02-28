# Genesis Frequency Generator - PythonAnywhere Setup Instructions

## Step 1: Upload the Flask App

1. Go to https://www.pythonanywhere.com and log in as `majesticmerlin`

2. Go to **Files** tab

3. Navigate to `/home/majesticmerlin/`

4. Upload `flask_app.py` (or copy-paste the contents into a new file)

## Step 2: Set Up the Web App

1. Go to **Web** tab

2. Click **Add a new web app**

3. Choose **Flask** and **Python 3.10** (or latest)

4. Set the path to: `/home/majesticmerlin/flask_app.py`

5. Click **Create**

## Step 3: Configure CORS

1. Go to **Consoles** tab

2. Start a **Bash** console

3. Run:
   ```bash
   pip install flask-cors
   ```

## Step 4: Update WSGI File

1. Go to **Web** tab

2. Click on the WSGI configuration file link

3. Replace contents with:

```python
import sys
path = '/home/majesticmerlin'
if path not in sys.path:
    sys.path.append(path)

from flask_app import app as application
```

4. Save the file

## Step 5: Reload the Web App

1. Go to **Web** tab

2. Click **Reload** button (green button)

## Step 6: Test Your API

Visit: https://majesticmerlin.pythonanywhere.com

You should see:
```json
{
  "status": "online",
  "service": "Genesis Frequency Generator License API",
  "version": "1.0.0"
}
```

## Step 7: IMPORTANT - Change Admin Key!

In `flask_app.py`, find and replace ALL instances of:
```
YOUR_SECRET_ADMIN_KEY_CHANGE_THIS
```

With a secure random key like:
```
MJ_2024_SecretKey_Xk9mP3nQ7
```

Then reload the web app.

## Adding License Keys

### Option 1: Use the API

```bash
curl -X POST https://majesticmerlin.pythonanywhere.com/admin/add-license \
  -H "Content-Type: application/json" \
  -d '{
    "admin_key": "YOUR_ADMIN_KEY",
    "license_key": "GFGN-PREM-1234-5678",
    "tier": "premium",
    "email": "customer@email.com",
    "etsy_order_id": "123456"
  }'
```

### Option 2: Generate a Key First

```bash
curl -X POST https://majesticmerlin.pythonanywhere.com/admin/generate-key \
  -H "Content-Type: application/json" \
  -d '{
    "admin_key": "YOUR_ADMIN_KEY",
    "tier": "premium"
  }'
```

This returns a new key like: `GFGN-PREM-A7B3-C9D2`

Then add it with the first command.

### Option 3: Direct Database Access

1. Go to **Consoles** > **Bash**
2. Run:
   ```bash
   sqlite3 genesis_licenses.db
   ```
3. Add a license:
   ```sql
   INSERT INTO licenses (license_key, tier, email, max_devices)
   VALUES ('GFGN-PREM-TEST-0001', 'premium', 'test@email.com', 3);
   ```
4. Exit: `.exit`

## Test License Keys

Create these for testing:

- Premium: `GFGN-PREM-TEST-0001`
- Ultimate: `GFGN-ULT1-TEST-0001`

## API Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/validate` | POST | Validate & activate license |
| `/api/check` | POST | Check if device is activated |
| `/admin/add-license` | POST | Add new license (admin) |
| `/admin/generate-key` | POST | Generate random key (admin) |
| `/admin/list-licenses` | POST | List all licenses (admin) |
