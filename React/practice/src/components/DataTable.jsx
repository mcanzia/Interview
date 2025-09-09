import { useState, useMemo } from 'react';
import users from './data/users';

export default function DataTable() {
    const [message, setMessage] = useState('Data Table');
    const [shownUsers, setShownUsers] = useState(users.slice(0, 5))
    const [pagination, setPagination] = useState({
        currentPage: 1,
        perPage: 5,
    });

    const totalPages = useMemo(() => {
        return Math.ceil(users.length / pagination.perPage);
    }, [pagination])

    function setPerPage(value) {
        const newPageNumber = 1;
        handlePageUpdate(newPageNumber, value);
    }

    function togglePrevPage() {
        const newPage = Math.max(1, pagination.currentPage - 1);
        handlePageUpdate(newPage);
    }

    function toggleNextPage() {
        const newPage = Math.min(totalPages, pagination.currentPage + 1);
        handlePageUpdate(newPage);
    }

    function handlePageUpdate(newPageNumber, perPage = pagination.perPage) {
        const startIndex = (newPageNumber - 1) * perPage;
        const endIndex = Math.min((newPageNumber * perPage), users.length)
        const newUsers = users.slice(startIndex, endIndex);
        setShownUsers(newUsers);
        setPagination({ ...pagination, currentPage: newPageNumber, perPage: perPage });
    }

    return (
        <div>
            <h1>{message}</h1>
            <table>
                <thead>
                    <tr>
                        {[
                            { label: 'ID', key: 'id' },
                            { label: 'Name', key: 'name' },
                            { label: 'Age', key: 'age' },
                            { label: 'Occupation', key: 'occupation' },
                        ].map(({ label, key }) => (
                            <th key={key}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {shownUsers.map(({ id, name, age, occupation }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{age}</td>
                            <td>{occupation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination pagination={pagination} totalPages={totalPages} setPerPage={setPerPage} prevPage={togglePrevPage} nextPage={toggleNextPage} />
        </div>
    );
}

function TablePagination({ pagination, totalPages, setPerPage, prevPage, nextPage }) {
    const numUserOptions = [5, 10, 20];

    function handleSelectChange(e) {
        if (e.target.value) {
            setPerPage(e.target.value);
        }
    }
    return (
        <>
            <div className="pagination">
                <button onClick={prevPage}>Prev</button>
                <span>{pagination.currentPage} of {totalPages}</span>
                <button onClick={nextPage}>Next</button>
                <select onChange={handleSelectChange}>
                    {
                        numUserOptions.map((value) => (
                            <option key={value}>{value}</option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}
