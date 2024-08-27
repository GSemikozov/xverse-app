import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    ApiOrdinalsUtxoPayload,
    ApiOrdinalsUtxoResponse,
    ApiInscriptionDetailPayload,
    ApiInscriptionDetailResponse,
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
            query: ({ address }) => ({
                url: `/address/${address}/ordinal-utxo`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getInscriptionDetails: builder.query<
            ApiInscriptionDetailResponse,
            ApiInscriptionDetailPayload
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

export const { useGetOrdinalsUtxoQuery, useGetInscriptionDetailsQuery } =
    ordinalUtxoApi;
