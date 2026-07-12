import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import counterReducer from "./counterSlice";
import userReducer from "./userSlice";

const customStorage = {
    getItem: (key) => {
        return Promise.resolve(window.localStorage.getItem(key));
    },
    setItem: (key, value) => {
        window.localStorage.setItem(key, value);
        return Promise.resolve();
    },
    removeItem: (key) => {
        window.localStorage.removeItem(key);
        return Promise.resolve();
    },
};

const persistConfig = {
    key: "root",
    storage: customStorage,
    whitelist: ["counter","user"],
};
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        });
    }
});

export const persistor = persistStore(store);