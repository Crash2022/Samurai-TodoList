import axios from "axios";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

// более короткая запись типа через infer
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

// развёрнутая типизация
// type CreateTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     data: {item: TodolistType}
// }
//
// type DeleteUpdateTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     data: { }
// }

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': '74a19bbb-094d-4af5-81dc-fc82431ac8a3'}
})

export const todolistsAPI = {
    getTodolists() {
        return (
            instance
                .get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {})
                .then(response => response.data)
        )
    },
    createTodolist(title: string) {
        return (
            instance
                .post<ResponseType<{item: TodolistType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, {})
                .then(response => response.data)
    )
    },
    deleteTodolist(todolistId: string) {
        return (
            instance
                .delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {})
                .then(response => response.data)
        )
    },
    updateTodolist(todolistId: string, newTitle: string) {
        return (
            instance
                .put<ResponseType<{ D }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: newTitle},{})
                .then(response => response.data)
        )
    }
}