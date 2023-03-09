import {todolistsAPI, TaskAPIType, TaskPriorities, TaskStatuses, UpdateTaskModelType,} from '../api/todolistsAPI';
import {AppRootStateType} from './store';
import {appSetStatusAC} from './app-reducer';
import {handleServerAppError, handleServerNetworkError,} from '../common/utils/errorUtils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TodolistDomainType, createTodolistTC, deleteTodolistTC, getTodolistsTC,} from './todolists-reducer';

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
            dispatch(appSetStatusAC({status: 'succeeded'}));
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

    dispatch(appSetStatusAC({status: 'loading'}));

    try {
        const response = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)

        if (response.data.resultCode === 0) {
            dispatch(appSetStatusAC({status: 'succeeded'}));
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
            const payload = action.payload as { todolists: TodolistDomainType[] }
            payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.todolistId];
            })


            .addCase(getTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks;
            })
            .addCase(createTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task);
            })
            .addCase(deleteTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index > -1) {
                    tasks.splice(index, 1);
                }
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel};
                }
            })
    }
})

export const tasksReducer = slice.reducer;

// вариант thunk для RTK из react-redux
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
}

export const createTaskTC = (task: TaskAPIType): AppThunkType => {
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
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunkType => {
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
}

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