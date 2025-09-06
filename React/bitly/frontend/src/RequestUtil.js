const requestUrl = "http://localhost:7500/api";

function createPOSTParams(data) {
    return {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

function createGETParams() {
    return {
        method: "GET",
    }
}

function setParams(data) {
    if (data !== null) {
        return createPOSTParams(data);
    } else {
        return createGETParams();
    }
}

export async function sendRequest(endpoint, data) {
    try {
        const response = await fetch(requestUrl + endpoint, setParams(data));
        return response.json();
    } catch (error) {

    }

}