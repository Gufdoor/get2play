export const domain = "http://localhost:4567/";

export async function get(path, auth) {
    let url = domain + path;
    
    let aux = fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
    }).then(res => { return res.json(); });
    return aux;
}

export async function post(path, auth, body) {
    let url = domain + path;
    
    let aux = fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            /*'Content-Type': 'application/json',*/
            'Authorization': auth
        },
        body: body
    }).then(res => { return res.json(); });
    return aux;
}

export async function put(path, auth, body) {
    let url = domain + path;
    
    let aux = fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        body: body
    }).then(res => { return res.json(); });
    return aux;
}

export async function del(path, auth) {
    let url = domain + path;
    
    let aux = fetch(url, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': auth
        },
    }).then(res => { return res.json(); });
    return aux;
}