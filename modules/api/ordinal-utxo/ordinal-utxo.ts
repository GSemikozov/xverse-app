import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    ApiOrdinalsUtxoPayload,
    ApiOrdinalsUtxoResponse,
    ApiInscriptionPayload,
    ApiInscriptionResponse,
} from './types';

export const ordinalUtxoApi = createApi({
    reducerPath: 'ordinalUtxoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_XVERSE_API_URL,
    }),
    endpoints: (builder) => ({
        getOrdinalsUtxo: builder.query<
            ApiOrdinalsUtxoResponse,
            ApiOrdinalsUtxoPayload
        >({
            query: ({ address, offset = 0 }) => ({
                url: `/address/${address}/ordinal-utxo`,
                method: 'GET',
                params: {
                    offset,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),

        getInscription: builder.query<
            ApiInscriptionResponse,
            ApiInscriptionPayload
        >({
            query: ({ address, inscriptionId }) => ({
                url: `/address/${address}/ordinals/inscriptions/${inscriptionId}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const { useGetOrdinalsUtxoQuery, useGetInscriptionQuery } =
    ordinalUtxoApi;
