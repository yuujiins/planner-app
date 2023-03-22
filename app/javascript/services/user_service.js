const server = '/users/'
const auth = '/auth/login'
const headerNoAuth = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
}
const headerAuth = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    'Authorization' : window.sessionStorage.getItem('token')
}
export const register_user = async (data) => {
    let ajaxResult = await fetch(server, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headerNoAuth
    })

    return ajaxResult;
}

export const update_user = async (data) => {
    let ajaxResult = await fetch(server + window.sessionStorage.getItem('user_id'), {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: headerAuth
    })

    return ajaxResult;
}

export const update_password = async (data) => {
    let ajaxResult = await fetch(server + 'password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headerAuth
    })

    return ajaxResult;
}

export const login_user = async (data) => {
    let ajaxResult = await fetch(auth, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headerNoAuth
    })

    return ajaxResult;
}