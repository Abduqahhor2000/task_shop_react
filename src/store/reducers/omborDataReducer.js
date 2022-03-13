import * as actionTypes from "../actionTypes";

const initialState = null;

const omborDataReducer = (state = initialState, action) => {
    const ombor = action?.payload;

    switch(action.type) {
        case actionTypes.ADD_OMBOR_DATA:{
            return ombor ? ombor : null;
        }
        case actionTypes.CLEAR_OMBOR_DATA:{
            return initialState;
        }
        default: {
            return state;
        }
    }

}

export default omborDataReducer;