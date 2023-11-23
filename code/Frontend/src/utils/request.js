// This function is used to send request to the api
// The id of the user is added in authorization header.s

async function request (url, options) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const baseUrl = "http://localhost:3030";
    const req = await fetch(baseUrl + "/" + url, {
        method: options?.method || "GET",
        body: options?.body ? JSON.stringify(options.body) : null,
        headers: {
            'Content-type': "application/json",
            authorization: "bearer " + user?._id,
        }
    });
    const data = await req.json();
    return data;
}

export default request;