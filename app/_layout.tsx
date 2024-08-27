import 'react-native-reanimated';

import React from 'react';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

import { colors } from '@/modules/ui/constants';
import { store } from '@/modules/app/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const stackScreenOptions = {
    headerStyle: {
        height: 88,
        backgroundColor: colors.black[100],
    },

    headerTitleAlign: 'center' as const,
    headerTitleStyle: {
        fontSize: 14,
        fontFamily: 'Montserrat-500',
    },

    headerTintColor: colors.white[100],

    headerShadowVisible: false,

    contentStyle: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: colors.black[100],
    },
};

const RootLayout = () => {
    const [loaded] = useFonts({
        'Montserrat-400': require('../assets/fonts/montserrat-latin-400-normal.ttf'),
        'Montserrat-400-italic': require('../assets/fonts/montserrat-latin-400-italic.ttf'),

        'Montserrat-500': require('../assets/fonts/montserrat-latin-500-normal.ttf'),
        'Montserrat-500-italic': require('../assets/fonts/montserrat-latin-500-italic.ttf'),
    });

    React.useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <Stack screenOptions={stackScreenOptions}>
                <Stack.Screen
                    name="index"
                    options={{
                        title: 'Ordinal Inscription Lookup',
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name="details/[address]/[inscriptionId]"
                    options={{
                        title: 'Details',
                        headerShown: true,
                        headerBackVisible: true,
                    }}
                />

                <Stack.Screen name="+not-found" />
            </Stack>
        </Provider>
    );
};

export default RootLayout;
