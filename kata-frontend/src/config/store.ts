import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {cartReducer} from '../features/cartSlice.ts';
import {productsReducer} from '../features/productsSlice.ts';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'], // Only persist cart state
};

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;