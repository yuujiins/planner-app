const server = '/api/v1/categories/'
const headerAuth = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    'Authorization' : window.sessionStorage.getItem('token')
}

export const get_categories = async () => {
    let categories = await fetch(server, {
        method: 'GET',
        headers: headerAuth
    })

    return categories
}

export const get_category = async (id) => {
    let category = await fetch(server + id, {
        method: 'GET',
        headers: headerAuth
    })

    return category
}
export const add_category = async (data) => {
    let result = await fetch(server, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headerAuth
    })

    return result;
}

export const update_category = async (id, data) => {
    let result = await fetch(server + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: headerAuth
    })

    return result;
}

export const delete_category = async(id) => {
    let result = await fetch(server + id, {
        method: 'DELETE',
        headers: headerAuth
    })

    return result
}