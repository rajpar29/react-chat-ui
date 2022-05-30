import { createTheme, Theme } from "@mui/material";

import { Observable, Subject } from 'rxjs'

import { ThemeTypes } from "./models/ThemeType.enum";


const theme$: Subject<Theme> = new Subject();
let customTheme: Theme;

const darkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(225deg, hsla(245, 31%, 21%, 1) 0%, hsla(215, 13%, 26%, 1) 100%)'
                }
            },

        }
    }
});

const lightTheme = createTheme({
    palette: {
        mode: 'light'
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(239.26deg, #DDEEED 63.17%, #FDF1E0 94.92%)'
                }
            },

        }
    }
});

export const createCustomTheme = (themeProps: { background?: string, paper?: string }) => {
    const background = themeProps.background || readCustomThemeConfig('background') || '#C0C0C0';
    const paper = themeProps.paper || readCustomThemeConfig('paper') || '#808080';
    storeCustomThemeConfig('background', background);
    storeCustomThemeConfig('paper', paper);

    customTheme = createTheme({
        palette: {
            background: {
                default: background,
                paper: paper
            },
        },
    })
}

export const watchTheme = (): Observable<Theme> => {
    return theme$.asObservable();
}

export const updateTheme = (theme: ThemeTypes): void => {
    storePrefferedTheme(theme);
    switch (theme) {
        case ThemeTypes.DARK:
            theme$.next(darkTheme);
            break;
        case ThemeTypes.LIGHT:
            theme$.next(lightTheme);
            break;
        case ThemeTypes.CUSTOM:
            theme$.next(customTheme);
            break;
        default:
            theme$.next(lightTheme);
            break;
    }
}

export const restorePrefferedTheme = (): void => {
    const themeName = readPrefferedTheme();
    createCustomTheme({});
    updateTheme(themeName);
}

export const readPrefferedTheme = (): ThemeTypes => {
    const themeName = localStorage.getItem('user-theme') || ThemeTypes.LIGHT;
    return themeName as ThemeTypes;
}

export const storePrefferedTheme = (theme: ThemeTypes): void => {
    localStorage.setItem('user-theme', theme);
}

const storeCustomThemeConfig = (config: 'background' | 'paper', value: string): void => {
    localStorage.setItem(config, value);
}

const readCustomThemeConfig = (config: 'background' | 'paper') : string | null=> {
    return localStorage.getItem(config);
}