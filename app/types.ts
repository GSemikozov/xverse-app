import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    index: undefined;
    'details/[address]/[inscriptionId]': {
        address: string;
        inscriptionId: string;
    };
    '+not-found': undefined;
};

export type DetailsScreenRouteProp = RouteProp<
    RootStackParamList,
    'details/[address]/[inscriptionId]'
>;
