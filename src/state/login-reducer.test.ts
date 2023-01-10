import {LoginInitialStateType, loginReducer, loginTC, setIsLoggedInAC} from "./login-reducer";

let startState: LoginInitialStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('user should be logged in', () => {

    // react-redux
    const endTasksState = loginReducer(startState, setIsLoggedInAC(true));

    // redux-toolkit
    // const endTasksState = loginReducer(startState, setIsLoggedInAC({isLoggedIn: true}));
    expect(endTasksState.isLoggedIn).toBeTruthy();
});

// export default {}