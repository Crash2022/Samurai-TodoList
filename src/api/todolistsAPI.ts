import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': '74a19bbb-094d-4af5-81dc-fc82431ac8a3'}
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

// более короткая запись типа через infer?
type TodolistsResponseType<D = {}> = {
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

type TasksResponseType = {
    error: string | null
    items: Array<TaskAPIType>
    totalCount: number
}

export type TaskAPIType = {
    description: string
    title: string
    completed: boolean // ?
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TaskUpdateAPIType = {
    description?: string
    title?: string
    isDone?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const todolistsAPI = {
    getTodolists() {
        return (
            instance
                .get<Array<TodolistType>>('todo-lists', {})
                .then(response => response.data)
        )
    },
    createTodolist(title: string) {
        return (
            instance
                .post<TodolistsResponseType<{ item: TodolistType }>>
                ('todo-lists', {title: title}, {})
                .then(response => response.data)
        )
    },
    deleteTodolist(todolistId: string) {
        return (
            instance
                .delete<TodolistsResponseType>
                (`todo-lists/${todolistId}`, {})
                .then(response => response.data)
        )
    },
    updateTodolist(todolistId: string, newTitle: string) {
        return (
            instance
                .put<TodolistsResponseType>
                (`todo-lists/${todolistId}`, {title: newTitle}, {})
                .then(response => response.data)
        )
    },


    getTasks(todolistId: string) {
        return (
            instance
                .get<TasksResponseType>
                (`todo-lists/${todolistId}/tasks`, {})
                .then(response => response.data)
        )
    },
    createTask(todolistId: string, newTask: string) {
        return (
            instance
                .post<TodolistsResponseType<{ item: TaskAPIType }>>
                (`todo-lists/${todolistId}/tasks/`, {title: newTask}, {})
                .then(response => response.data)
        )
    },
    deleteTask(todolistId: string, taskId: string) {
        return (
            instance
                .delete<TodolistsResponseType>
                (`todo-lists/${todolistId}/tasks/${taskId}`, {})
                .then(response => response.data)
        )
    },
    updateTask(todolistId: string, taskId: string, model: TaskUpdateAPIType) {
        return (
            instance
                .put<TodolistsResponseType<{ item: TaskUpdateAPIType }>>
                (`todo-lists/${todolistId}/tasks/${taskId}`, {...model}, {})
                .then(response => response.data)
        )
    }
}