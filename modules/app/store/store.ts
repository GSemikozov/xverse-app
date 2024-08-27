import { ordinalUtxoApi } from '@/modules/api';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        [ordinalUtxoApi.reducerPath]: ordinalUtxoApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ordinalUtxoApi.middleware),
});
