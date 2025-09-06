import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
    table: {
        borderCollapse: 'collapse'
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    },
    phoneBook: {
        overflow: 'scroll',
    },
    section: {
        height: '100vh',
        overflow: 'scroll',
    }
}

function PhoneBookForm({ addEntryToPhoneBook }) {
    const [userEntry, setUserEntry] = useState({
        userFirstname: "Coder",
        userLastname: "Byte",
        userPhone: "8885559999"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserEntry((prev) => ({ ...prev, [name]: value }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { userFirstname, userLastname, userPhone } = userEntry;
        if (userFirstname && userLastname && userPhone) {
            addEntryToPhoneBook(userEntry);
            setUserEntry({ userFirstname: "", userLastname: "", userPhone: "" });
        }
    }
    return (
        <form onSubmit={handleSubmit} style={style.form.container}>
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userFirstname'
                name='userFirstname'
                type='text'
                value={userEntry.userFirstname}
                onChange={handleChange}
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userLastname'
                name='userLastname'
                type='text'
                value={userEntry.userLastname}
                onChange={handleChange}
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userPhone'
                name='userPhone'
                type='text'
                value={userEntry.userPhone}
                onChange={handleChange}
            />
            <br />
            <input
                style={style.form.submitBtn}
                className='submitButton'
                type='submit'
                value='Add User'
            />
        </form>
    )
}

function InformationTable(props) {
    return (
        <table style={style.table} className='informationTable'>
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
                {
                    props.users.map((user, index) => (
                        <tr key={index}>
                            <td style={style.tableCell}>{user.userFirstname}</td>
                            <td style={style.tableCell}>{user.userLastname}</td>
                            <td style={style.tableCell}>{user.userPhone}</td>
                        </tr>
                    ))
                }
            </thead>
        </table>
    );
}

export default function Application(props) {
    const [users, setUsers] = useState([]);
    function addNewUserEntry(newUser) {
        const newUsers = [...users, newUser];
        const newUsersSorted = newUsers.sort((a, b) => {
            if (a.userLastname > b.userLastname) {
                return 1;
            } else if (a.userLastname < b.userLastname) {
                return -1;
            }
            return 0;
        });
        setUsers(newUsers);
    }
    return (
        <section style={style.section}>
            <PhoneBookForm addEntryToPhoneBook={addNewUserEntry} />
            <InformationTable users={users} style={style.phoneBook} />
        </section>
    );
}

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<Application />);