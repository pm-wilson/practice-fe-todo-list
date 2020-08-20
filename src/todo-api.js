import request from 'superagent';

const URL = 'https://shielded-refuge-74286.herokuapp.com'; //process.env.REACT_APP_API_URL || 'http://localhost:3000';

export function signUp(userData) {
    try {
        return request.post(`${URL}/auth/signup`, userData);
    } catch(e) {
        return { error: e.message }
    }
}

export function signIn(userData) {
    try {
        return request.post(`${URL}/auth/signin`, userData);
    } catch(e) {
        return { error: e.message }
    }
}

export function fetchTodos() {
    const token = localStorage.getItem('TOKEN');

    try {
        return request
            .get(`${URL}/api/todos`)
            .set('Authorization', token);
    } catch(e) {
        return { error: e.message }
    }
}

export function addTodo(newTodo) {
    const token = localStorage.getItem('TOKEN');
    try {
        return request
            .post(`${URL}/api/todos`, newTodo)
            .set('Authorization', token);
    } catch(e) {
        return { error: e.message }
    }
}

export function updateTodo(id, updatedTodo) {
    const token = localStorage.getItem('TOKEN');

    return request.put(`${URL}/api/guitars/${id}`, updatedTodo)
        .set('Authorization', token);
}