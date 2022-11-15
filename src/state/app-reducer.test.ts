import {AppInitialStateType, appReducer, appSetErrorAC, appSetStatusAC} from "./app-reducer";

let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('app status should be changed', () => {

    const endTasksState = appReducer(startState, appSetStatusAC('loading'));
    expect(endTasksState.status).toBe('loading');
});

test('app error message should be set', () => {

    const endTasksState = appReducer(startState, appSetErrorAC('Some Error'));
    expect(endTasksState.error).toBe('Some Error');
});