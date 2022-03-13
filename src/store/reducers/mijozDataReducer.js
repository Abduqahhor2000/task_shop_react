import * as actionTypes from "../actionTypes";

const initialState = null;

const mijozDataReducer = (state = initialState, action) => {
    const mijoz = action?.payload;

    switch(action.type) {
        case actionTypes.ADD_MIJOZ_DATA:{
            return mijoz ? mijoz : null;
        }
        case actionTypes.CLEAR_MIJOZ_DATA:{
            return initialState;
        }
        default: {
            return state;
        }
    }

}

export default mijozDataReducer;