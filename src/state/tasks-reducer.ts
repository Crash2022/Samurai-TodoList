import {todolistsAPI, TaskAPIType, TaskPriorities, TaskStatuses, UpdateTaskModelType} from "../api/todolistsAPI";
import {AppRootStateType} from "./store";
import {appSetStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errorUtils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createTodolistTC, deleteTodolistTC, getTodolistsTC, TodolistDomainType} from "./todolists-reducer";

// redux-toolkit
export type TasksListType = {
    [todolistId: string]: Array<TaskAPIType>
}

const initialState: TasksListType = {};

export const getTasksTC = createAsyncThunk('tasks/getTasks',
    async (todolistId: string, {dispatch, rejectWithValue}) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        const response = await todolistsAPI.getTasks(todolistId);
        dispatch(appSetStatusAC({status: 'succeeded'}));
        return {todolistId, tasks: response.data.items};
    } catch (err) {
        const error: any = err; // AxiosError
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
})

export const createTaskTC = createAsyncThunk('tasks/createTask',
    async (task: TaskAPIType, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        const response = await todolistsAPI.createTask(task);

        if (response.data.resultCode === 0) {
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return {task: response.data.data.item};
        } else {
            handleServerAppError(response.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (err) {
        const error: any = err; // AxiosError
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }

})

export const deleteTaskTC = createAsyncThunk('tasks/deleteTask',
    async (param: { todolistId: string, taskId: string }, {dispatch, rejectWithValue}) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        const response = await todolistsAPI.deleteTask(param.todolistId, param.taskId);
        return {todolistId: param.todolistId, taskId: param.taskId}
    } catch (err) {
        const error: any = err; // AxiosError
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: {
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
}, {dispatch, rejectWithValue, getState}) => {

    const state = getState() as AppRootStateType;
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId);

    // обработка ошибки
    if (!task) {
        return rejectWithValue('Task Not Found In The State');
    }

    const apiModel: UpdateTaskModelType = {
        description: task.description,
        title: task.title,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...param.domainModel
    }

    try {
        const response = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)

        if (response.data.resultCode === 0) {
            return param;
        } else {
            handleServerAppError(response.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (err) {
        const error: any = err; // AxiosError
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
})

// slice
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
            const payload = action.payload as {todolists: TodolistDomainType[]}
            payload.todolists.forEach(tl => {state[tl.id] = []})
        });
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId];
        });


        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
        });
        builder.addCase(createTaskTC.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        });
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel};
            }
        });
    }
})

export const tasksReducer = slice.reducer;

// вариант thunk из react-redux
/*export const getTasksTC = (todolistId: string): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        todolistsAPI.getTasks(todolistId)
            .then(response => {
                dispatch(setTasksAC({todolistId, tasks: response.data.items}));
                dispatch(appSetStatusAC({status: 'succeeded'}));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/

/*export const createTaskTC = (task: TaskAPIType): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        todolistsAPI.createTask(task)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(createTaskAC({task: response.data.data.item}));
                    dispatch(appSetStatusAC({status: 'succeeded'}));
                } else {
                    handleServerAppError(response.data, dispatch);
                }
                dispatch(appSetStatusAC({status: 'failed'}));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/

/*export const deleteTaskTC = (todolistId: string, taskId: string): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC({status: 'loading'}));
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(response => {
                dispatch(deleteTaskAC({todolistId, taskId}));
                dispatch(appSetStatusAC({status: 'succeeded'}));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/

// обновление разных свойств таски в одной "санке"
/*export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunkType => {
    return (dispatch, getState: () => AppRootStateType) => {

        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);

        // обработка ошибки
        if (!task) {
            // throw new Error('Task Not Found In The State'); // иной вариант предупреждения
            console.warn('Task Not Found In The State');
            return;
        }

        const apiModel: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(updateTaskAC({todolistId, taskId, model: domainModel}));
                } else {
                    handleServerAppError(response.data, dispatch);
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}*/

/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/

// react-redux
// export type TasksListType = {
//     [todolistId: string]: Array<TaskAPIType>
// }

// иной метод типизации initialState
// type StateType = typeof initialState

// const initialState: TasksListType = {
//     [todolistId1]: [
//         {todoListId: 'todolistId1', id: v1(), title: 'HTML&CSS',
//             status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 0},
//         {todoListId: 'todolistId1', id: v1(), title: 'React',
//             status: TaskStatuses.New, priority: TaskPriorities.Hi,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 1}
//     ],
//     [todolistId2]: [
//         {todoListId: 'todolistId2', id: v1(), title: 'Notebook',
//             status: TaskStatuses.New, priority: TaskPriorities.Low,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 0},
//         {todoListId: 'todolistId2', id: v1(), title: 'New Bike',
//             status: TaskStatuses.Completed, priority: TaskPriorities.Later,
//             description: '', addedDate: '', startDate: '', deadline: '', order: 1}
//     ]
// }

/*const initialState: TasksListType = {};

export const tasksReducer = (state: TasksListType = initialState, action: TasksActionTypes): TasksListType => {
    switch (action.type) {
        case 'DELETE_TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        }
        case 'CREATE_TASK': {
            /!*const newTask: TaskAPIType = {todoListId: action.todolistId, id: v1(), title: action.titleInput,
                status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', addedDate: '', startDate: '', deadline: '', order: 0};
            return {...state, [action.todolistId]: [newTask,...state[action.todolistId]]};*!/

            const newTask: TaskAPIType = action.task;
            return {...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]};
        }

        // обработка тасок двумя кейсами
        // case 'UPDATE_TASK_STATUS': {
        //     return {...state, [action.todolistId]:
        //             state[action.todolistId].map( el => el.id === action.taskId ? {...el, status: action.status} : el)};
        // }
        // case 'UPDATE_TASK_TITLE': {
        //     return {...state, [action.todolistId]:
        //             state[action.todolistId].map( el => el.id === action.taskId ? {...el, title: action.title} : el)};
        // }

        // обработка тасок одним кейсом
        case 'UPDATE_TASK': {
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].map(el => el.id === action.taskId ? {...el, ...action.model} : el)
            };
        }

        case 'DELETE_TODOLIST': {
            // const {[action.todolistId]: [], ...rest} = {...state} //другой способ через деструктуризацию
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'CREATE_NEW_TODOLIST': {
            return {...state, [action.todolist.id]: []};
            // return { ...state, [action.todolistId]: [] };
        }
        case 'SET_TODOLISTS': {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState;
        }
        case 'SET_TASKS': {
            const copyState = {...state};
            copyState[action.todolistId] = action.tasks;
            return copyState;
        }
        default:
            //throw new Error("I don't know action type!");
            return state;
    }
}*/

/*-----------------------------------------------------------------------------------*/

/*export type TasksActionTypes =
    DeleteTaskACType |
    CreateTaskACType |
    //UpdateTaskStatusACType |
    //UpdateTaskTitleACType |
    UpdateTaskACType |
    CreateTodolistACType |
    DeleteTodolistACType |
    SetTodolistsACType |
    SetTasksACType;

export type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolistId: string, taskId: string) => ({
    type: 'DELETE_TASK',
    todolistId,
    taskId
} as const)

export type CreateTaskACType = ReturnType<typeof createTaskAC>
export const createTaskAC = (task: TaskAPIType /!*todolistId: string, titleInput: string*!/) => ({
    type: 'CREATE_TASK', task
    /!*todolistId,
    titleInput*!/
} as const)*/

// *версия без объекта model
// export type UpdateTaskStatusACType = ReturnType<typeof updateTaskStatusAC>
// export const updateTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => ({
//     type: 'UPDATE_TASK_STATUS',
//     todolistId,
//     taskId,
//     status
// } as const)
//
// export type UpdateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
// export const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
//     type: 'UPDATE_TASK_TITLE',
//     todolistId,
//     taskId,
//     title
// } as const)

// *версия с объектом model для изменения статуса и тайтла таски
/*export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => ({
    type: 'UPDATE_TASK',
    todolistId,
    taskId,
    model
} as const)

export type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: Array<TaskAPIType>) => ({
    type: 'SET_TASKS',
    todolistId, tasks
} as const)*/

/*-----------------------------------------------------------------------------------*/

/*
export const getTasksTC = (todolistId: string): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        todolistsAPI.getTasks(todolistId)
            .then(response => {
                dispatch(setTasksAC(todolistId, response.data.items));
                dispatch(appSetStatusAC('succeeded'));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
                // dispatch(appSetErrorAC(error.message));
                // dispatch(appSetStatusAC('failed'));
            })
    }
}

export const createTaskTC = (task: TaskAPIType): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        todolistsAPI.createTask(task)
            .then(response => {
                if (response.data.resultCode === 0) {
                    // dispatch(addTaskAC(task)); // !!! так лучше не делать
                    dispatch(createTaskAC(response.data.data.item));
                    dispatch(appSetStatusAC('succeeded'));
                } else {
                    handleServerAppError(response.data, dispatch);
                    // if (response.data.messages) {
                    //     dispatch(appSetErrorAC(response.data.messages[0]));
                    // } else {
                    //     dispatch(appSetErrorAC('Some Error'));
                    // }
                }
                dispatch(appSetStatusAC('failed'));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
                // dispatch(appSetErrorAC(error.message));
                // dispatch(appSetStatusAC('failed'));
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunkType => {
    return (dispatch) => {
        dispatch(appSetStatusAC('loading'));
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(response => {
                dispatch(deleteTaskAC(todolistId, taskId));
                dispatch(appSetStatusAC('succeeded'));
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
                // dispatch(appSetErrorAC(error.message));
                // dispatch(appSetStatusAC('failed'));
            })
    }
}

/!*
// менее правильный и короткий вариант
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTask(todolistId, taskId, {title: title})
            .then(response => {
                dispatch(updateTaskTitleAC(todolistId, taskId, title));
            })
    }
}

// !правильный вариант!
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);

        // обработка ошибки
        if(!task) {
            // throw new Error('Task Not Found In The State'); // иной вариант предупреждения
            console.warn('Task Not Found In The State');
            return;
        }

        const model: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(response => {
                dispatch(updateTaskStatusAC(todolistId, taskId, status));
            })
    }
}*!/

// обновление разных свойств таски в одной "санке"
export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunkType => {
    return (dispatch, getState: () => AppRootStateType) => {

        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);

        // обработка ошибки
        if (!task) {
            // throw new Error('Task Not Found In The State'); // иной вариант предупреждения
            console.warn('Task Not Found In The State');
            return;
        }

        const apiModel: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, domainModel));
                } else {
                    handleServerAppError(response.data, dispatch);
                    // if (response.data.messages) {
                    //     dispatch(appSetErrorAC(response.data.messages[0]));
                    // } else {
                    //     dispatch(appSetErrorAC('Some Error'));
                    // }
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
                // dispatch(appSetErrorAC(error.message));
                // dispatch(appSetStatusAC('failed'));
            })
    }
}*/
