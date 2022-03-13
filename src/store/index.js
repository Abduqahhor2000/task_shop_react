import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import userDataReducer from "./reducers/userDataReducer";
import mijozDataReducer from "./reducers/mijozDataReducer";
import omborDataReducer from "./reducers/omborDataReducer";
import logger from 'redux-logger';
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "mijoz", "ombor"],
}
const rootReducer = combineReducers({
    user: userDataReducer,
    mijoz: mijozDataReducer,
    ombor: omborDataReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(logger, thunk)));
  
export const persistor = persistStore(store);
export default store;