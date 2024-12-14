import axios from 'axios';

// Using environment variable to get base URL, defaulting to localhost for development
const API_BASE_URL = process.env.REACT_APP_GATEWAY_URL || 'http://localhost:8083';

class PaymentService {
    // Function to process a payment
    static async processPayment(paymentData) {
        try {
            const response = await axios.post(`${API_BASE_URL}/payment`, paymentData);
            return response.data; // return the payment response from backend
        } catch (error) {
            throw this.handleError(error); // handle any error
        }
    }

    // Function to get all payments
    static async getAllPayments() {
        try {
            const response = await axios.get(`${API_BASE_URL}/payment`);
            return response.data; // return list of payments
        } catch (error) {
            throw this.handleError(error); // handle any error
        }
    }

    // Function to get a payment by its ID
    static async getPaymentById(paymentId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/payment/${paymentId}`);
            return response.data; // return the specific payment data
        } catch (error) {
            throw this.handleError(error); // handle any error
        }
    }

    // Generic error handler function
    static handleError(error) {
        if (error.response) {
            // If error response exists from backend, return message from backend
            return new Error(error.response.data.message || 'Payment processing failed');
        }
        if (error.request) {
            // If error request exists but no response (e.g., network failure)
            return new Error('Network error occurred');
        }
        // Catch any other unexpected errors
        return new Error(error.message || 'An unexpected error occurred');
    }
}

export default PaymentService;
