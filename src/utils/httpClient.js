//const BASE_URL = 'http://localhost:3000'
let BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export async function post(path, body) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(body);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const data = fetch(`${BASE_URL}${path}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));

    return data
}

export async function get(path) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const data = await fetch(`${BASE_URL}${path}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));

    return data
}

export async function getID(path) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BASE_URL}${path}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}


export async function DELETE(path, body) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(body);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const data = fetch(`${BASE_URL}${path}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));

    return data;
}
