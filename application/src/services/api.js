const api = {
    users: 'http://localhost:3030/users',
    figures: 'http://127.0.0.1:3030/figures'
};

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

export {
    register,
    login,
    createPost,
    getAllPosts,
}
