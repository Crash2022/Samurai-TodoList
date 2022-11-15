export type AppInitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: AppInitialStateStatusType
    // текст ошибки запишем сюда
    error: string | null
}
export type AppInitialStateStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ApplicationActionTypes = AppSetStatusACType | AppSetErrorACType;

const initialState: AppInitialStateType = {
    status: 'idle', // idle - начальное значение (простаивание)
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

export type AppSetStatusACType = ReturnType<typeof appSetStatusAC>
export const appSetStatusAC = (status: AppInitialStateStatusType) => ({
    type: 'APP/SET_STATUS', status
} as const)

export type AppSetErrorACType = ReturnType<typeof appSetErrorAC>
export const appSetErrorAC = (error: string | null) => ({
    type: 'APP/SET_ERROR', error
} as const)

/*-----------------------------------------------------------------------------------*/