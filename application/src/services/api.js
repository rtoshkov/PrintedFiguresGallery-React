const api = {
    users: 'http://localhost:3030/users',
    figures: 'http://127.0.0.1:3030/figures'
};

// USER

const register = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const request = await fetch(`${api.users}/register`, options);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }

    return request
}


const login = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const request = await fetch(`${api.users}/login`, options);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }

    return request
}


const logout = async (token) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
    }
    return await fetch(`${api.users}/logout`, options);
}

// POSTS

const createPost = async (data, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(data)
    }

    const request = await fetch(`${api.figures}`, options);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }
    return request
}

const getAllPosts = async () => {
    const request = await fetch(`${api.figures}`);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }
    return request
}


const getPost = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const request = await fetch(`${api.figures}/${id}`, options);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }
    return request;
}

const deletePost = async (id, token) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
    }
    const request = await fetch(`${api.figures}/${id}`, options);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }
    return request;
}


const editPost = async (id, data, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(data),
    }
    const request = await fetch(`${api.figures}/${id}`, options);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }
    return request;
}

const postComment = async (id, data, token) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(data),
    }
    const request = await fetch(`${api.figures}/comment/${id}`, options);
    if (request.ok === false) {
        const err = await request.json();
        throw new Error(err.message);
    }
    return request;
}

export {
    register,
    login,
    createPost,
    getAllPosts,
    getPost,
    deletePost,
    editPost,
    logout,
    postComment,
}
