import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    index: undefined;
    '+not-found': undefined;

    'details/[address]/[inscriptionId]': {
        address: string;
        inscriptionId: string;
    };
};

export type DetailsScreenRouteProp = RouteProp<
    RootStackParamList,
    'details/[address]/[inscriptionId]'
>;
