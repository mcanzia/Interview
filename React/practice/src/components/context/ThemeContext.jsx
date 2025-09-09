// ThemeContext.jsx
import { createContext, useContext, useState } from "react";

// 1) create context
const ThemeContext = createContext();

// 2) provider component
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3) custom hook (optional but nice)
export function useTheme() {
    return useContext(ThemeContext);
}
