const api = 'http://localhost:3030/users/register';

 const register = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

     const request = await fetch(api, options);
     if (request.ok === false) {
         const err = await request.json();
         throw new Error(err.message);
     }

    return request
}

export default register
