import { useState, useEffect } from 'react';

export default function App() {
    const [numbers, setNumbers] = useState(new Map());
    const [message] = useState('Hello World!');

    async function fetchRandomNumbers() {
        try {
            const response = await fetch("https://www.random.org/integers/?num=200&min=1950&max=2019&col=1&base=10&format=plain");
            if (!response.ok) { console.log("Error") }
            return response.text();

        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        let cancelled = false;
        fetchRandomNumbers()
            .then((list) => {
                if (cancelled) return;
                const counts = new Map();
                list.trim().split(/\s+/).forEach((tok) => {
                    const year = Number(tok);
                    const decade = Math.floor(year / 10) * 10;
                    counts.set(decade, (counts.get(decade) ?? 0) + 1);
                });
                setNumbers(counts);
            }
            )
            .catch((error) => { console.log("Error", error) });
        return () => {
            cancelled = true;
        }
    }, []);

    return (
        <>
            <ul>
                {
                    // numbers.entries.map((number, index) => {
                    //   <li key={index}>{number}</li>
                    // })
                }
            </ul>
        </>
    )
}
