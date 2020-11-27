export default (urlParams, values, type) => {
    return fetch('http://localhost:3001' + urlParams, {
        method: type,
        headers: {
            'Content-Type': 'application/json'
        },
        body: values
    });
}