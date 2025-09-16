import React, { createContext, useContext, useState, useCallback } from 'react';

const CustomPreferencesContext = createContext();

export const CustomPreferencesProvider = ({ children }) => {
    const [customPreferences, setCustomPreferences] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const loadPreferences = useCallback((token) => {
        if (loaded || !token) return;

        fetch(`/api/site-preferences?token=${encodeURIComponent(token)}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCustomPreferences(data.customPreferences);
                    setLoaded(true);
                }
            })
            .catch((err) => {
                console.error('Error fetching preferences:', err);
            });
    }, [loaded]);

    return (
        <CustomPreferencesContext.Provider value={{ customPreferences, loadPreferences }}>
            {children}
        </CustomPreferencesContext.Provider>
    );
};

export const useCustomPreferences = () => useContext(CustomPreferencesContext);
