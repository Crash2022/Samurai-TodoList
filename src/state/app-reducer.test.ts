import {
    AppInitialStateType,
    appReducer,
    appSetErrorAC,
    appSetInitializedAC,
    appSetStatusAC,
    initializeAppTC
} from "./app-reducer";

let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('app status should be changed', () => {

    // redux-toolkit
    // const endTasksState = appReducer(startState, appSetStatusAC({status: 'loading'}));

    const endTasksState = appReducer(startState, appSetStatusAC('loading'));
    expect(endTasksState.status).toBe('loading');
});

test('app error message should be set', () => {

    // redux-toolkit
    // const endTasksState = appReducer(startState, appSetErrorAC({error: 'Some Error'}));

    const endTasksState = appReducer(startState, appSetErrorAC('Some Error'));
    expect(endTasksState.error).toBe('Some Error');
});

test('app should initialize', () => {

    // react-redux
    const endTasksState = appReducer(startState, appSetInitializedAC(true));

    // redux-toolkit
    // const endTasksState = appReducer(startState, initializeAppTC.fulfilled({isInitialized: true}, 'requestId'));
    expect(endTasksState.isInitialized).toBeTruthy();
});

// export default {}