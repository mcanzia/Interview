import { useState } from "react"

const style = {
    articleBlock: {
        display: 'inline-flex',
        gap: '20px'
    },
    inputBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
    },
    textInput: {
        width: '50vw',
        height: '20px'
    },
    button: {
        height: '50px',
        marginTop: '25px'
    }
}

export function UrlInput({ shortenUrl }) {
    const [inputValue, setInputValue] = useState("");

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserEntry((prev) => ({ ...prev, [name]: value }));
    // };

    function handleChange(e) {
        setInputValue(e.target.value);
    }

    function handleShorten() {
        if (inputValue) {
            shortenUrl(inputValue);
        }
    }

    return (
        <>
            <article style={style.articleBlock}>
                <p style={style.inputBlock}>
                    <span>URL Input</span>
                    <input name="urlInput" onChange={handleChange} style={style.textInput} value={inputValue}></input>
                </p>
                <button style={style.button} onClick={handleShorten}>Shorten URL</button>
            </article>
        </>
    )
}