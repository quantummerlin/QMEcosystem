// Quantum Merlin - Square Payment Integration
// This handles the payment processing for the wish system

// Square Configuration
const SQUARE_APPLICATION_ID = 'YOUR_SQUARE_APPLICATION_ID'; // Replace with your Square App ID
const SQUARE_LOCATION_ID = 'YOUR_SQUARE_LOCATION_ID'; // Replace with your Square Location ID

// Initialize Square Payments
async function initializeSquarePayments() {
    if (!window.Square) {
        throw new Error('Square.js failed to load properly');
    }

    const payments = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);
    
    try {
        const card = await payments.card();
        await card.attach('#card-container');
        return { payments, card };
    } catch (e) {
        console.error('Initializing Square Payments failed', e);
        return null;
    }
}

// Process Payment
async function processSquarePayment(card, amount, submissionData) {
    try {
        // Tokenize the card
        const result = await card.tokenize();
        
        if (result.status === 'OK') {
            const token = result.token;
            
            // Send to your backend
            const response = await fetch('/api/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sourceId: token,
                    amount: amount * 100, // Convert to cents
                    currency: 'USD',
                    submissionData: submissionData
                })
            });
            
            const paymentResult = await response.json();
            
            if (paymentResult.success) {
                return { success: true, paymentId: paymentResult.paymentId };
            } else {
                return { success: false, error: paymentResult.error };
            }
        } else {
            let errorMessage = 'Payment failed. Please try again.';
            if (result.errors) {
                errorMessage = result.errors.map(error => error.message).join(', ');
            }
            return { success: false, error: errorMessage };
        }
    } catch (e) {
        console.error('Payment processing error:', e);
        return { success: false, error: 'Payment processing failed. Please try again.' };
    }
}

// Export functions for use in other files
window.QuantumPayments = {
    initialize: initializeSquarePayments,
    process: processSquarePayment
};