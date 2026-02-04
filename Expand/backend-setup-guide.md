# Quantum Merlin Backend Setup Guide
## Simple Backend for Square Payments & Email Delivery

---

## 🎯 **What You Need**

1. **Square Account** - For payment processing
2. **Email Service** - For sending readings (SendGrid, Mailgun, or Gmail)
3. **Simple Backend** - Node.js server (can run on Vercel or any hosting)

---

## 📋 **Step 1: Square Setup**

### **Create Square Account**
1. Go to https://squareup.com/signup
2. Create a free account
3. Go to Square Developer Dashboard: https://developer.squareup.com/apps

### **Get Your Credentials**
1. Create a new application
2. Copy your **Application ID** (starts with `sandbox-sq0idb-` for testing)
3. Copy your **Location ID** from Locations tab
4. Copy your **Access Token** (for backend API calls)

### **Update Frontend**
In `quantum-wishes.html`, replace:
```javascript
const applicationId = 'sandbox-sq0idb-YOUR_APP_ID'; // Replace with your actual App ID
const locationId = 'YOUR_LOCATION_ID'; // Replace with your actual Location ID
```

---

## 🖥️ **Step 2: Simple Backend Setup**

### **Option A: Node.js + Express (Recommended)**

Create a file called `server.js`:

```javascript
const express = require('express');
const { Client, Environment } = require('square');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Square Configuration
const squareClient = new Client({
  accessToken: 'YOUR_SQUARE_ACCESS_TOKEN', // From Square Dashboard
  environment: Environment.Sandbox // Use Environment.Production for live
});

// Email Configuration (using Gmail as example)
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password' // Use App Password, not regular password
  }
});

// Process Payment Endpoint
app.post('/api/process-quantum-payment', async (req, res) => {
  try {
    const { sourceId, amount, submissionData } = req.body;
    
    // Process payment with Square
    const { result } = await squareClient.paymentsApi.createPayment({
      sourceId: sourceId,
      amountMoney: {
        amount: amount * 100, // Convert to cents
        currency: 'USD'
      },
      idempotencyKey: `quantum-${Date.now()}-${Math.random()}`,
      locationId: 'YOUR_LOCATION_ID'
    });
    
    // Payment successful - send confirmation email to you
    await sendSubmissionEmail(submissionData, result.payment.id);
    
    // Send confirmation to user
    await sendUserConfirmation(submissionData);
    
    res.json({
      success: true,
      paymentId: result.payment.id
    });
    
  } catch (error) {
    console.error('Payment error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Send submission data to you
async function sendSubmissionEmail(data, paymentId) {
  const wishesText = data.wishes.map((w, i) => 
    `${i + 1}. [${w.type.toUpperCase()}]: ${w.content}`
  ).join('\n\n');
  
  const emailContent = `
NEW QUANTUM READING REQUEST
Payment ID: ${paymentId}
Amount: $${data.price}
Package: ${data.packageType}

USER PROFILE:
Name: ${data.userProfile.userName}
Email: ${data.userProfile.userEmail}
Archetype: ${data.userProfile.archetype}
Learning Style: ${data.userProfile.learningStyle}
Spiritual Relationship: ${data.userProfile.spiritualRelationship}
Motivation: ${data.userProfile.motivation}
Priorities: ${data.userProfile.priorities?.join(', ')}

WISHES/QUESTIONS:
${wishesText}

ADDITIONAL CONTEXT:
${data.userProfile.additionalContext || 'None provided'}

---
Use the GPT prompt template to generate their reading!
  `;
  
  await emailTransporter.sendMail({
    from: 'your-email@gmail.com',
    to: 'your-email@gmail.com', // Your email to receive submissions
    subject: `New Quantum Reading - ${data.userProfile.userName} - $${data.price}`,
    text: emailContent
  });
}

// Send confirmation to user
async function sendUserConfirmation(data) {
  await emailTransporter.sendMail({
    from: 'your-email@gmail.com',
    to: data.userProfile.userEmail,
    subject: '✨ Your Quantum Reading Request Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8b5cf6;">Your Quantum Wishes Are Activated!</h1>
        <p>Dear ${data.userProfile.userName},</p>
        <p>Thank you for your payment of $${data.price}. Your quantum reading request has been received and is being processed.</p>
        <p><strong>You will receive your personalized reading within 24 hours.</strong></p>
        <p>Your ${data.wishes.length} wishes/questions are being analyzed through our quantum consciousness AI system, tuned specifically to your ${data.userProfile.archetype} archetype energy.</p>
        <p>With quantum blessings,<br>Quantum Merlin</p>
      </div>
    `
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Quantum Merlin backend running on port ${PORT}`);
});
```

### **Install Dependencies**
```bash
npm init -y
npm install express square nodemailer cors
```

### **Run Server**
```bash
node server.js
```

---

## 📧 **Step 3: Email Setup Options**

### **Option A: Gmail (Easiest for Testing)**
1. Enable 2-factor authentication on your Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use that password in the nodemailer config

### **Option B: SendGrid (Best for Production)**
1. Create account at https://sendgrid.com
2. Get API key
3. Update nodemailer config:
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');
```

### **Option C: Mailgun**
1. Create account at https://mailgun.com
2. Get API credentials
3. Use mailgun-js package

---

## 🚀 **Step 4: Deploy Backend**

### **Option A: Vercel (Easiest)**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Update frontend API URL to your Vercel URL

### **Option B: Heroku**
1. Create Heroku account
2. Install Heroku CLI
3. Deploy: `git push heroku main`

### **Option C: DigitalOcean/AWS**
1. Create droplet/instance
2. Upload code
3. Run with PM2: `pm2 start server.js`

---

## 🔄 **Step 5: Automated Follow-ups**

### **Simple Cron Job Approach**

Create `follow-ups.js`:
```javascript
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Store submissions in a simple JSON file or database
const submissions = require('./submissions.json');

// Run daily at 9 AM
cron.schedule('0 9 * * *', () => {
  checkFollowUps();
});

function checkFollowUps() {
  const now = new Date();
  
  submissions.forEach(sub => {
    const submissionDate = new Date(sub.timestamp);
    const daysSince = Math.floor((now - submissionDate) / (1000 * 60 * 60 * 24));
    
    // Day 1 follow-up
    if (daysSince === 1 && !sub.followUps?.day1) {
      sendDay1Email(sub);
      sub.followUps = { ...sub.followUps, day1: true };
    }
    
    // Week 1 follow-up
    if (daysSince === 7 && !sub.followUps?.week1) {
      sendWeek1Email(sub);
      sub.followUps = { ...sub.followUps, week1: true };
    }
    
    // Month 1 follow-up
    if (daysSince === 30 && !sub.followUps?.month1) {
      sendMonth1Email(sub);
      sub.followUps = { ...sub.followUps, month1: true };
    }
    
    // Year 1 follow-up
    if (daysSince === 365 && !sub.followUps?.year1) {
      sendYear1Email(sub);
      sub.followUps = { ...sub.followUps, year1: true };
    }
  });
  
  // Save updated submissions
  fs.writeFileSync('./submissions.json', JSON.stringify(submissions, null, 2));
}
```

---

## 📝 **Step 6: Your Daily Workflow**

### **When You Receive a Submission Email:**

1. **Open the email** with user's profile and wishes
2. **Copy the GPT prompt template** from `gpt-reading-prompt-template.md`
3. **Fill in their specific data:**
   - Name, email, archetype, learning style
   - All their wishes/questions
4. **Paste into GPT-4** (ChatGPT Plus or API)
5. **Review the generated reading** (2-3 minutes)
6. **Copy into HTML email template**
7. **Send to user's email**
8. **Done!** (10-15 minutes total)

---

## 🎯 **Testing Checklist**

### **Before Going Live:**
- [ ] Test Square payment with test card (4111 1111 1111 1111)
- [ ] Verify you receive submission emails
- [ ] Verify user receives confirmation email
- [ ] Test complete user flow end-to-end
- [ ] Generate a test reading with GPT-4
- [ ] Send test reading email to yourself
- [ ] Verify all data is captured correctly

### **Square Test Cards:**
- Success: 4111 1111 1111 1111
- Decline: 4000 0000 0000 0002
- CVV: Any 3 digits
- Expiry: Any future date
- ZIP: Any 5 digits

---

## 💡 **Pro Tips**

### **Keep It Simple:**
- Start with Gmail for email (free, easy)
- Use Square Sandbox for testing (free)
- Deploy on Vercel (free tier available)
- Store submissions in simple JSON file initially
- Upgrade to database when you have 100+ users

### **Security:**
- Never commit API keys to GitHub
- Use environment variables
- Enable HTTPS on your backend
- Validate all user input
- Keep Square in Sandbox until fully tested

### **Scaling:**
- Start manual, automate later
- Use spreadsheet to track submissions initially
- Add database when volume increases
- Consider hiring VA for reading generation at scale

---

## ✨ **You're Ready!**

With this setup, you have:
- ✅ Square payment processing
- ✅ Automated email notifications
- ✅ User confirmation emails
- ✅ Simple backend that scales
- ✅ 10-15 minute workflow per reading

**Total setup time: 2-3 hours**
**Ongoing time: 10-15 minutes per reading**
**Revenue potential: $20-50 per user, unlimited scale**

🚀 **Let's launch your automated spiritual guidance empire!**