import { useEffect, useState } from "react";

const PAGE_SIZE = 6;

async function fetchIds() {
    const res = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

async function fetchJob(id) {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

async function fetchJobsByIds(ids) {
    return Promise.all(ids.map(fetchJob));
}

export default function JobApp() {
    const [ids, setIds] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [visible, setVisible] = useState(0);       // how many IDs are currently loaded
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1) Get the ID list once
    useEffect(() => {
        let cancelled = false;
        fetchIds()
            .then((list) => { if (!cancelled) setIds(list); })
            .catch((e) => setError(e.message));
        return () => { cancelled = true; };
    }, []);

    // 2) Load the first page when IDs arrive
    useEffect(() => {
        if (ids.length && visible === 0) {
            handleLoadMore();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ids]);

    async function handleLoadMore() {
        if (loading) return;
        const end = Math.min(visible + PAGE_SIZE, ids.length);
        const nextIds = ids.slice(visible, end);
        if (nextIds.length === 0) return;

        setLoading(true);
        try {
            const nextJobs = await fetchJobsByIds(nextIds);
            setJobs((prev) => [...prev, ...nextJobs]);
            setVisible(end);
        } catch (e) {
            setError(e.message ?? "Failed to load jobs");
        } finally {
            setLoading(false);
        }
    }

    if (error) return <div>Error: {error}</div>;
    if (!ids.length && !jobs.length) return <div>Loading…</div>;

    return (
        <>
            <h1>Hacker News Job Board</h1>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id} className="posting">
                        <h3 className="posting__title">{job.title}</h3>
                        <div className="posting__details">
                            <h5>By {job.by}</h5>
                            <h5>{new Date(job.time * 1000).toLocaleString()}</h5>
                        </div>
                    </li>
                ))}
            </ul>

            {visible < ids.length && (
                <button onClick={handleLoadMore} disabled={loading}>
                    {loading ? "Loading…" : "Load More Jobs"}
                </button>
            )}
            {visible >= ids.length && <div>All caught up ✅</div>}
        </>
    );
}
