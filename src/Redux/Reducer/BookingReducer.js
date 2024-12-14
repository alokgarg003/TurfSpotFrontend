import {
    BOOKING_REQUEST,
    BOOKING_SUCCESS,
    BOOKING_FAIL,
    BOOKING_RESET
} from '../Actions/BookingAction';

const initialState = {
    loading: false,
    booking: null,
    error: null,
    success: false
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                booking: action.payload,
                success: true,
                error: null
            };

        case BOOKING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        case BOOKING_RESET:
            return initialState;

        default:
            return state;
    }
};

export default bookingReducer;