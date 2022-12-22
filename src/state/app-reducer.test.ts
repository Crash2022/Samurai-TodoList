// import {AppInitialStateType, appReducer, appSetErrorAC, appSetInitializedAC, appSetStatusAC} from "./app-reducer";
//
// let startState: AppInitialStateType;
//
// beforeEach(() => {
//     startState = {
//         status: 'idle',
//         error: null,
//         isInitialized: false
//     }
// })
//
// test('app status should be changed', () => {
//
//     const endTasksState = appReducer(startState, appSetStatusAC({status: 'loading'}));
//     expect(endTasksState.status).toBe('loading');
// });
//
// test('app error message should be set', () => {
//
//     const endTasksState = appReducer(startState, appSetErrorAC({error: 'Some Error'}));
//     expect(endTasksState.error).toBe('Some Error');
// });
//
// test('app should initialize', () => {
//
//     const endTasksState = appReducer(startState, appSetInitializedAC({isInitialized: true}));
//     expect(endTasksState.isInitialized).toBeTruthy();
// });

export default {}