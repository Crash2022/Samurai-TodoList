import {TodolistAPIType, todolistsAPI, TodolistsResponseType} from '../api/todolistsAPI';
import {AppInitialStateStatusType, appSetErrorAC, appSetStatusAC} from './app-reducer';
import {handleServerNetworkErrorSaga} from '../common/utils/errorUtils';
import {call, put, takeEvery} from 'redux-saga/effects';
import {AxiosError, AxiosResponse} from 'axios';

// reducer
export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistAPIType & {
    filter: FilterType
    entityStatus: AppInitialStateStatusType
}

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
                                 action: TodolistsActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'DELETE_TODOLIST': {
            return state.filter(t => t.id !== action.id);
        }
        case 'CREATE_NEW_TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
            return [newTodolist, ...state];
        }
        case 'UPDATE_TODOLIST_TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el);
        }
        case 'UPDATE_TODOLIST_FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el);
        }
        case 'CHANGE_TODOLIST_ENTITY_STATUS': {
            return state.map(el => el.id === action.id ? {...el, entityStatus: action.entityStatus} : el);
        }
        case 'SET_TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        }
        default:
            //throw new Error("I don't know action type!");
            return state;
    }
}

/*-----------------------------------------------------------------------------------*/

// actions
export type TodolistsActionTypes =
    CreateTodolistACType |
    DeleteTodolistACType |
    UpdateTodolistTitleACType |
    UpdateTodolistFilterACType |
    ChangeTodolistEntityStatusACType |
    SetTodolistsACType;

export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistId: string) => ({
    type: 'DELETE_TODOLIST',
    id: todolistId
} as const)

export type CreateTodolistACType = ReturnType<typeof createTodolistAC>
export const createTodolistAC = (todolist: TodolistAPIType /*title: string*/) => ({
    type: 'CREATE_NEW_TODOLIST', todolist
    // title,
    // todolistId: v1()
} as const)

export type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (id: string, title: string) => ({
    type: 'UPDATE_TODOLIST_TITLE',
    id, title
} as const)

export type UpdateTodolistFilterACType = ReturnType<typeof updateTodolistFilterAC>
export const updateTodolistFilterAC = (id: string, filter: FilterType) => ({
    type: 'UPDATE_TODOLIST_FILTER',
    id, filter
} as const)

export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (id: string, entityStatus: AppInitialStateStatusType) => ({
    type: 'CHANGE_TODOLIST_ENTITY_STATUS',
    id, entityStatus
} as const)

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: Array<TodolistAPIType>) => ({
    type: 'SET_TODOLISTS',
    todolists
} as const)

/*-----------------------------------------------------------------------------------*/

// react-redux-saga
export function* todolistsWatcherSaga() {
    yield takeEvery('TODOLISTS/GET_TODOLISTS', getTodolistsTC_WorkerSaga)
    yield takeEvery('TODOLISTS/DELETE_TODOLIST', deleteTodolistTC_WorkerSaga)
    yield takeEvery('TODOLISTS/CREATE_TODOLIST', createTodolistTC_WorkerSaga)
    yield takeEvery('TODOLISTS/UPDATE_TODOLIST_TITLE', updateTodolistTitleTC_WorkerSaga)
}

export const getTodolistsTC = () => ({type: 'TODOLISTS/GET_TODOLISTS'} as const)
export function* getTodolistsTC_WorkerSaga(action: ReturnType<typeof getTodolistsTC>): any {
    yield put(appSetStatusAC('loading'));
    const response: AxiosResponse<Array<TodolistAPIType>> = yield call(todolistsAPI.getTodolists)
    try {
        yield put(setTodolistsAC(response.data));
        yield put(appSetStatusAC('succeeded'));
    } catch (error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError);
    }
}

export const deleteTodolistTC = (todolistId: string) => ({type: 'TODOLISTS/DELETE_TODOLIST', todolistId} as const)
export function* deleteTodolistTC_WorkerSaga(action: ReturnType<typeof deleteTodolistTC>): any {
    yield put(appSetStatusAC('loading'));
    yield put(changeTodolistEntityStatusAC(action.todolistId,'loading'));
    const response: AxiosResponse<TodolistsResponseType> = yield call(todolistsAPI.deleteTodolist, action.todolistId)
    try {
        yield put(deleteTodolistAC(action.todolistId))
        yield put(appSetStatusAC('succeeded'));
    } catch (error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError);
    }
}

export const createTodolistTC = (todolist: TodolistDomainType) => ({type: 'TODOLISTS/CREATE_TODOLIST', todolist} as const)
export function* createTodolistTC_WorkerSaga(action: ReturnType<typeof createTodolistTC>): any {
    yield put(appSetStatusAC('loading'));
    const response: AxiosResponse<TodolistsResponseType<{ item: TodolistAPIType }>> = yield call(todolistsAPI.createTodolist, action.todolist.title)
    try {
        yield put(createTodolistAC(response.data.data.item))
        yield put(appSetStatusAC('succeeded'));
    } catch (error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError);
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string) => ({type: 'TODOLISTS/UPDATE_TODOLIST_TITLE', todolistId, title} as const)
export function* updateTodolistTitleTC_WorkerSaga(action: ReturnType<typeof updateTodolistTitleTC>): any {
    yield put(appSetStatusAC('loading'));
    yield put(changeTodolistEntityStatusAC(action.todolistId,'loading'));
    const response: AxiosResponse<TodolistsResponseType> = yield call(todolistsAPI.updateTodolist, action.todolistId, action.title)
    try {
        if (response.data.resultCode === 0) {
            yield put(updateTodolistTitleAC(action.todolistId, action.title))
            yield put(appSetStatusAC('succeeded'));
            yield put(changeTodolistEntityStatusAC(action.todolistId,'succeeded'));
        } else {
            if (response.data.messages) {
                yield put(appSetErrorAC(response.data.messages[0]));
                yield put(appSetStatusAC('failed'));
                yield put(changeTodolistEntityStatusAC(action.todolistId,'failed'));
            } else {
                yield put(appSetErrorAC('Some Error'));
            }
        }
    } catch (error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError);
    }
}