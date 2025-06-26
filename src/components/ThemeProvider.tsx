import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Available theme types
 */
export type ThemeType = 'light' | 'dark' | 'system' | string;

/**
 * Theme colors object definition
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  card: string;
  cardBorder: string;
  progressBar: string;
  progressBackground: string;
  modalBackground: string;
  modalOverlay: string;
  buttonText: string;
  buttonBackground: string;
  toastBackground: string;
  toastText: string;
}

/**
 * Interface for custom theme definitions
 */
export interface CustomTheme {
  name: string;
  colors: Partial<ThemeColors>;
}

/**
 * Theme context value interface
 */
export interface ThemeContextValue {
  /** Current theme name */
  theme: ThemeType;
  /** Set the theme */
  setTheme: (theme: ThemeType) => void;
  /** Theme colors */
  colors: ThemeColors;
  /** Add a custom theme */
  addCustomTheme: (customTheme: CustomTheme) => void;
}

/**
 * Default light theme colors
 */
const lightTheme: ThemeColors = {
  primary: '#4CAF50',
  secondary: '#2196F3',
  background: '#ffffff',
  text: '#333333',
  border: '#e0e0e0',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  card: '#ffffff',
  cardBorder: '#e0e0e0',
  progressBar: '#4CAF50',
  progressBackground: '#e0e0e0',
  modalBackground: '#ffffff',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  buttonText: '#ffffff',
  buttonBackground: '#4CAF50',
  toastBackground: '#ffffff',
  toastText: '#333333',
};

/**
 * Default dark theme colors
 */
const darkTheme: ThemeColors = {
  primary: '#66BB6A',
  secondary: '#42A5F5',
  background: '#121212',
  text: '#f5f5f5',
  border: '#333333',
  success: '#66BB6A',
  warning: '#FFD54F',
  error: '#EF5350',
  card: '#1e1e1e',
  cardBorder: '#333333',
  progressBar: '#66BB6A',
  progressBackground: '#333333',
  modalBackground: '#1e1e1e',
  modalOverlay: 'rgba(0, 0, 0, 0.75)',
  buttonText: '#ffffff',
  buttonBackground: '#66BB6A',
  toastBackground: '#1e1e1e',
  toastText: '#f5f5f5',
};

// Create theme context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Props for the ThemeProvider component
 */
export interface ThemeProviderProps {
  /** Children components */
  children: React.ReactNode;
  /** Initial theme to use */
  initialTheme?: ThemeType;
  /** Additional custom themes */
  customThemes?: CustomTheme[];
  /** Whether to persist theme preference in localStorage */
  persistTheme?: boolean;
  /** Storage key for theme preference */
  storageKey?: string;
}

/**
 * ThemeProvider - Provides theming context for trophy components
 * 
 * @example
 * ```tsx
 * <ThemeProvider initialTheme="dark" persistTheme={true}>
 *   <YourApp />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'system',
  customThemes = [],
  persistTheme = true,
  storageKey = 'react-trophies-theme'
}) => {
  // Initialize themes map with default themes
  const [themesMap, setThemesMap] = useState<Record<string, ThemeColors>>({
    light: lightTheme,
    dark: darkTheme
  });
  
  // Add custom themes to the map
  useEffect(() => {
    const newThemesMap = { ...themesMap };
    customThemes.forEach(customTheme => {
      if (customTheme.name && customTheme.colors) {
        newThemesMap[customTheme.name] = {
          ...(newThemesMap[customTheme.name] || lightTheme),
          ...customTheme.colors
        };
      }
    });
    setThemesMap(newThemesMap);
  }, [customThemes]);
  
  // Initialize theme state, potentially from localStorage
  const [theme, setThemeState] = useState<ThemeType>(() => {
    if (persistTheme) {
      const savedTheme = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      return savedTheme || initialTheme;
    }
    return initialTheme;
  });

  // Determine if we should use dark mode based on system preference
  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Listen for changes in system color scheme
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update localStorage when theme changes
  useEffect(() => {
    if (persistTheme && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, theme);
    }
  }, [theme, persistTheme, storageKey]);

  // Set theme function that updates state
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  // Add custom theme function
  const addCustomTheme = (customTheme: CustomTheme) => {
    if (customTheme.name && customTheme.colors) {
      setThemesMap(prev => ({
        ...prev,
        [customTheme.name]: {
          ...(prev[customTheme.name] || lightTheme),
          ...customTheme.colors
        }
      }));
    }
  };

  // Determine the active theme colors
  const activeTheme = theme === 'system'
    ? (systemIsDark ? 'dark' : 'light')
    : theme;
    
  const colors = themesMap[activeTheme] || lightTheme;

  // Context value
  const contextValue: ThemeContextValue = {
    theme,
    setTheme,
    colors,
    addCustomTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use the theme context
 * @returns The theme context value
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
