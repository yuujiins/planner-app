const server = '/users/'
const auth = '/auth/login'
const headerNoAuth = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
}
export const register_user = async (data) => {
    let ajaxResult = await fetch(server, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headerNoAuth
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