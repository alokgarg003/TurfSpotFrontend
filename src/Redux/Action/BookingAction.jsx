// import { REGISTER_SUCCESS, REGISTER_FAIL } from '../Constants/Constants';
// import axios from 'axios';

// const BookingAction = (userState, history) => {
//     return async (dispatch) => {
//         try {
//             console.log("Sending booking data:", userState);
//             const response = await axios.post(
//                 "http://localhost:8085/booking", 
//                 userState,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
            
//             console.log("Booking response:", response.data);
//             dispatch({ type: REGISTER_SUCCESS, payload: response.data });
//             alert("Booking added successfully");
//             history.push("/profile/user");
            
//         } catch (error) {
//             console.error("Booking error:", error);
//             alert("Failed to create booking. Please try again.");
//             dispatch({ type: REGISTER_FAIL, payload: error.message });
//         }
//     }
// };

// export default BookingAction;



import axios from 'axios';

// Define proper action types for booking
export const BOOKING_REQUEST = 'BOOKING_REQUEST';
export const BOOKING_SUCCESS = 'BOOKING_SUCCESS';
export const BOOKING_FAIL = 'BOOKING_FAIL';
export const BOOKING_RESET = 'BOOKING_RESET';

// API configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8085';

const BookingAction = (bookingData, history) => {
    return async (dispatch) => {
        try {
            // Dispatch booking request action
            dispatch({ type: BOOKING_REQUEST });

            // Validate booking data
            if (!bookingData.userId || !bookingData.turfId || !bookingData.date || !bookingData.slotId) {
                throw new Error('Missing required booking information');
            }

            // Make API call
            const response = await axios.post(
                `${API_URL}/booking`,
                bookingData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 5000, // 5 second timeout
                }
            );

            // Handle successful booking
            dispatch({
                type: BOOKING_SUCCESS,
                payload: response.data
            });

            // Show success message and redirect
            dispatch(showNotification('success', 'Booking successful!'));
            history.push("/profile/user");

        } catch (error) {
            // Handle different types of errors
            let errorMessage = 'An unexpected error occurred';

            if (error.response) {
                // Server responded with error
                errorMessage = error.response.data.message || 'Booking failed';
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                // No response received
                errorMessage = 'Unable to reach server. Please check your connection.';
                console.error('Network Error:', error.request);
            } else {
                // Error in request setup
                errorMessage = error.message;
                console.error('Request Error:', error.message);
            }

            // Dispatch failure action
            dispatch({
                type: BOOKING_FAIL,
                payload: errorMessage
            });

            // Show error notification
            dispatch(showNotification('error', errorMessage));
        }
    };
};

// Helper action for showing notifications
const showNotification = (type, message) => ({
    type: 'SHOW_NOTIFICATION',
    payload: {
        type,
        message
    }
});

// Action to reset booking state
export const resetBooking = () => ({
    type: BOOKING_RESET
});

export default BookingAction;