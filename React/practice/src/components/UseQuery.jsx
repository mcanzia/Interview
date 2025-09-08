import { useState, useEffect } from 'react';
/**
 * @template T
 * @param {() => Promise<T>} fn
 * @param {import("react").DependencyList} deps
 */
export default function useQuery(fn, deps = []) {
    const [state, setState] = useState({ status: "loading" });

    useEffect(() => {
        let cancelled = false;
        setState({ status: "loading" });

        (async () => {
            try {
                const data = await fn();
                if (!cancelled) setState({ status: "success", data });
            } catch (err) {
                if (!cancelled) {
                    const error = err instanceof Error ? err : new Error(String(err));
                    setState({ status: "error", error });
                }
            }
        })();

        return () => { cancelled = true; };
    }, deps);
    return state;
}