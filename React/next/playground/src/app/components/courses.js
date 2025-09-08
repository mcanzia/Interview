export function Courses() {
    const data = ["A", "B", "C"];
    return (
        <ul>
            {
                data.map((value, index) => (
                    <li key={index}>{value}</li>
                ))
            }
        </ul>
    )
}