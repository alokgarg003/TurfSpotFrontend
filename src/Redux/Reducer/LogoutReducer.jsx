// import { LOGOUT_SUCCESS, LOGOUT_FAIL} from "../Constants/Constants";



// export const logoutReducer=(state = {}, action) => {

//     switch(action.type){
//         case LOGOUT_SUCCESS:
//             return {logoutState:false};
//         case LOGOUT_FAIL:
//             return {message:"login fail"};
//         default :
//             return state;
//     }
// }

import { LOGOUT_SUCCESS, LOGOUT_FAIL } from "../Constants/Constants";

export const logoutReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return { logoutState: false, message: null };  // Clear message on success
        case LOGOUT_FAIL:
            return { logoutState: false, message: action.payload || "Logout failed" };  // Provide dynamic error message
        default:
            return state;
    }
}
