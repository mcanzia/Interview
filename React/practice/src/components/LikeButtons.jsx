import { HeartIcon, SpinnerIcon } from './icons';
import { useState } from 'react';

export default function App() {
    const [isDefault, setIsDefault] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLike() {
        try {
            setLoading(true);
            const response = await fetch("https://questions.greatfrontend.com/api/questions/like-button",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: isDefault ? 'like' : 'unlike'
                    })
                });
            if (!response.ok) {
                const error = await response.json();
                setErrorMessage(error.message);
            } else {
                const success = await response.json();
                setErrorMessage("");
                setIsDefault(!isDefault);
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }

    }

    const buttonStyle = {
        "backgroundColor": isDefault ? "#fff" : "#f00",
        "color": !isDefault ? "#fff" : ""
    }

    return (
        <div>
            <button className="likeButton" style={buttonStyle} onClick={handleLike}>
                {
                    loading ? <SpinnerIcon /> : <HeartIcon />
                }
                {isDefault ? "Like" : "Liked"}
            </button>
            <p>
                {errorMessage && <span>{errorMessage}</span>}
            </p>
        </div>
    );
}
