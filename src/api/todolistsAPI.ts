import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': '74a19bbb-094d-4af5-81dc-fc82431ac8a3'}
})

export const todolistsAPI = {
    getTodolists() {
        return (
            instance
                .get('https://social-network.samuraijs.com/api/1.1/todo-lists', {})
                .then(response => response.data)
        )
    },
    createTodolist(title: string) {
        return (
            instance
                .post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, {})
                .then(response => response.data)
    )
    },
    deleteTodolist(todolistId: string) {
        return (
            instance
                .delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {})
                .then(response => response.data)
        )
    },
    updateTodolist(todolistId: string, newTitle: string) {
        return (
            instance
                .put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: newTitle},{})
                .then(response => response.data)
        )
    }
}