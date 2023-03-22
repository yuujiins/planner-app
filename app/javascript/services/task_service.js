const server = '/api/v1/tasks/'
const headerAuth = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    'Authorization' : window.sessionStorage.getItem('token')
}

export const get_tasks = async (filter) => {
    let tasks
    if(filter){

        tasks = await fetch(server +'?' + new URLSearchParams({
            task_date: filter.task_date,
            category_id: filter.category_id,
            sort: filter.sort == undefined ? null : filter.sort
        }), {
            method: 'GET',
            headers: headerAuth
        })
    }
    else{
        tasks = await fetch(server, {
            method: 'GET',
            headers: headerAuth,
        })
    }


    return tasks
}

export const get_task = async (id) => {
    let task = await fetch(server + id, {
        method: 'GET',
        headers: headerAuth
    })

    return task
}

export const add_task = async (data) => {
    let result = await fetch(server, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headerAuth
    })

    return result;
}

export const update_task = async (id, data) => {
    let result = await fetch(server + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: headerAuth
    })

    return result;
}

export const delete_task = async (id) => {
    let result = await fetch(server + id , {
        method: 'DELETE',
        headers: headerAuth
    })

    return result;
}