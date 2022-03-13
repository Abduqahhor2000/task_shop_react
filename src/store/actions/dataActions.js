import * as actionTypes from "../actionTypes";

export const addUserData = (payload) => {
    return {
        payload,
        type: actionTypes.ADD_USER_DATA,
    }
}
export const clearUserData = () => {
    return {
        type: actionTypes.CLEAR_USER_DATA,
    }
}
export const addMijozData = (payload) => {
    return {
        payload,
        type: actionTypes.ADD_MIJOZ_DATA,
    }
}
export const clearMijozData = () => {
    return {
        type: actionTypes.CLEAR_MIJOZ_DATA,
    }
}
export const addOmborData = (payload) => {
    return {
        payload,
        type: actionTypes.ADD_OMBOR_DATA,
    }
}
export const clearOmborData = () => {
    return {
        type: actionTypes.CLEAR_OMBOR_DATA,
    }
}
