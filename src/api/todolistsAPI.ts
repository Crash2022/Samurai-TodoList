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
    updateTodolist(newTitle: string) {
        return (
            instance
                .put('https://social-network.samuraijs.com/api/1.1/todo-lists/9d0b5bc3-9ec2-4208-b117-b09a9d056e8c', {title: newTitle},{})
                .then(response => response.data)
        )
    }
}