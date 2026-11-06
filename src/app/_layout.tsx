import { Stack } from 'expo-router';
import { View } from 'react-native';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

const RootNavigator = () => {
    const { colors, isReady } = useTheme();

    if (!isReady) {
        return <View style={{ flex: 1, backgroundColor: colors.background }} />;
    }

    return (
        <Stack
            screenOptions={{
                contentStyle: { backgroundColor: colors.background },
                headerShown: false,
            }}
        />
    );
};

const RootLayout = () => (
    <ThemeProvider>
        <RootNavigator />
    </ThemeProvider>
);

export default RootLayout;
