import { createContext, useReducer, useEffect, useMemo } from 'react';
import { settingsReducer, initialState } from './settingsReducer';

export const SettingsContext = createContext(null);

function loadSettings() {
  try {
    const stored = localStorage.getItem('glamour_settings');
    return stored ? { ...initialState, ...JSON.parse(stored) } : initialState;
  } catch {
    return initialState;
  }
}

export function SettingsProvider({ children }) {
  const [settings, dispatch] = useReducer(settingsReducer, null, loadSettings);

  useEffect(() => {
    try {
      localStorage.setItem('glamour_settings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save settings to localStorage:', error);
    }
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(settings.theme);
  }, [settings.theme]);

  const value = useMemo(() => ({ settings, dispatch }), [settings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
