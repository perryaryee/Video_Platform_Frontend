import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, PersistConfig } from "redux-persist";
import userReducer from "../Slices/UserSlice";




const persistConfig: PersistConfig<RootState> = {
    key: "root",
    storage,
};

const reducers = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

// Define the root state type
export type RootState = ReturnType<typeof reducers>;

const store = configureStore({
    reducer: persistedReducer,
});

export default store;
