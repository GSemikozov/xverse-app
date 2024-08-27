export type ApiOrdinalUtxoInscription = {
    id: string;
    offset: number;
    content_type: string;
};

export type ApiOrdinalUtxoSat = {
    number: number;
    rarity_ranking: string;
    offset: number;
};

export type ApiOrdinalUtxo = {
    txid: string;
    vout: number;
    block_height: number;
    value: number;
    sats: ApiOrdinalUtxoSat[];
    inscriptions: ApiOrdinalUtxoInscription[];
};

export type ApiOrdinalsUtxoPayload = {
    address: string;
};

export type ApiOrdinalsUtxoResponse = {
    limit: number;
    offset: number;
    total: number;
    results: ApiOrdinalUtxo[];
};

export interface ApiInscriptionDetailPayload {
    address: string;
    inscriptionId: string;
}

export interface ApiInscriptionDetailResponse {
    id: string;
    number: number;
    address: string;
    genesis_address: string;
    genesis_block_height: number;
    genesis_block_hash: string;
    genesis_tx_id: string;
    genesis_fee: number;
    genesis_timestamp: number;
    location: string;
    output: string;
    offset: number;
    sat_ordinal: number;
    sat_rarity: string;
    sat_coinbase_height: number;
    mime_type: string;
    content_type: string;
    content_length: number;
    tx_id: string;
    timestamp: number;
    value: number;
}
