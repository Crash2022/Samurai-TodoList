export type AppInitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: InitialStateStatusType
    // текст ошибки запишем сюда
    error: string | null
}
type InitialStateStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState: AppInitialStateType = {
    status: 'idle', // idle - начальное (стандартное) значение
    error: null
}

export const appReducer = (state: AppInitialStateType = initialState,
                                 action: ApplicationActionTypes): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS': {
            return {...state, status: action.status};
        }
        case 'APP/SET_ERROR': {
            return {...state, error: action.error};
        }
        default:
            return {...state};
    }
}

/*-----------------------------------------------------------------------------------*/

export type ApplicationActionTypes = AppSetStatusACType | AppSetErrorACType;

export type AppSetStatusACType = ReturnType<typeof appSetStatusAC>
export const appSetStatusAC = (status: InitialStateStatusType) => ({
    type: 'APP/SET_STATUS', status
} as const)

export type AppSetErrorACType = ReturnType<typeof appSetErrorAC>
export const appSetErrorAC = (error: string | null) => ({
    type: 'APP/SET_ERROR', error
} as const)

/*-----------------------------------------------------------------------------------*/

// async await version getTodolistsTC
// export const getTodolistsTC = (): AppThunkType => async (dispatch) => {
//     try {
//         const response = await todolistsAPI.getTodolists();
//         dispatch(setTodolistsAC(response.data)); // response находится в переменной
//     }
//     catch(error) {
//         console.log(error)
//     }
// }

// export const  = (): AppThunkType => {
//     return (dispatch) => {
//         todolistsAPI.getTodolists()
//             .then(response => {
//                 dispatch(setTodolistsAC(response.data));
//             })
//     }
// }