import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert, Appearance } from 'react-native';
import type { ReactNode } from 'react';

const THEME_STORAGE_KEY = 'landas.appearance';

export type ThemeMode = 'dark' | 'light';

type ThemeColors = {
    background: string;
    surface: string;
    elevatedSurface: string;
    foreground: string;
    secondary: string;
    muted: string;
    subtle: string;
    border: string;
    accent: string;
    accentSoft: string;
    accentText: string;
    input: string;
};

const themes: Record<ThemeMode, ThemeColors> = {
    dark: {
        background: '#080A08',
        surface: '#101310',
        elevatedSurface: '#151A15',
        foreground: '#F4F5F3',
        secondary: '#A0A49F',
        muted: '#818880',
        subtle: '#777E76',
        border: '#293229',
        accent: '#19F000',
        accentSoft: '#1A2618',
        accentText: '#071006',
        input: '#101410',
    },
    light: {
        background: '#F4F7F1',
        surface: '#FFFFFF',
        elevatedSurface: '#E9EFE6',
        foreground: '#1B2419',
        secondary: '#596357',
        muted: '#737D70',
        subtle: '#737D70',
        border: '#D8E0D3',
        accent: '#168A0B',
        accentSoft: '#E5F1E1',
        accentText: '#FFFFFF',
        input: '#F8FAF6',
    },
};

type ThemeContextValue = {
    mode: ThemeMode;
    isReady: boolean;
    isSaving: boolean;
    colors: ThemeColors;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const applyNativeColorScheme = (mode: ThemeMode) => {
    if (typeof Appearance.setColorScheme === 'function') {
        Appearance.setColorScheme(mode);
    }
};

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [mode, setMode] = useState<ThemeMode>('dark');
    const [isReady, setIsReady] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        let isMounted = true;

        AsyncStorage.getItem(THEME_STORAGE_KEY)
            .then((savedMode) => {
                if (!isMounted) {
                    return;
                }

                if (savedMode === 'dark' || savedMode === 'light') {
                    setMode(savedMode);
                    applyNativeColorScheme(savedMode);
                } else {
                    applyNativeColorScheme('dark');
                }
            })
            .catch((error: unknown) => {
                if (isMounted) {
                    Alert.alert(
                        'Appearance could not be loaded',
                        error instanceof Error ? error.message : 'The saved appearance is unavailable.',
                    );
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsReady(true);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const toggleTheme = useCallback(() => {
        if (!isReady || isSaving) {
            return;
        }

        const previousMode = mode;
        const nextMode: ThemeMode = mode === 'dark' ? 'light' : 'dark';

        setIsSaving(true);
        setMode(nextMode);
        applyNativeColorScheme(nextMode);

        AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode)
            .catch((error: unknown) => {
                setMode(previousMode);
                applyNativeColorScheme(previousMode);
                Alert.alert(
                    'Appearance could not be saved',
                    error instanceof Error ? error.message : 'Please try changing the appearance again.',
                );
            })
            .finally(() => setIsSaving(false));
    }, [isReady, isSaving, mode]);

    const value = useMemo(
        () => ({ mode, isReady, isSaving, colors: themes[mode], toggleTheme }),
        [isReady, isSaving, mode, toggleTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};
