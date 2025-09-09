// Header.jsx
import { useTheme } from "./ThemeContext";

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header
            style={{
                padding: "1rem",
                background: theme === "light" ? "#eee" : "#333",
                color: theme === "light" ? "#000" : "#fff",
            }}
        >
            <h1>Current theme: {theme}</h1>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </header>
    );
}
