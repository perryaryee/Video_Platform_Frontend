import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, PersistConfig } from "redux-persist";
import userReducer from "../Slices/UserSlice";
import videoReducer from "../Slices/VideoSlice";
import AdminReducer from "../Slices/AdminSlice";




const persistConfig: PersistConfig<RootState> = {
    key: "root",
    storage,
};

const reducers = combineReducers({
    user: userReducer,
    video: videoReducer,
    admin: AdminReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export type RootState = ReturnType<typeof reducers>;

const store = configureStore({
    reducer: persistedReducer,
});

export default store;
