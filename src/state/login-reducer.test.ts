import {LoginInitialStateType, loginReducer, setIsLoggedInAC} from "./login-reducer";

let startState: LoginInitialStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('user should be logged in', () => {
    const endTasksState = loginReducer(startState, setIsLoggedInAC(true));
    expect(endTasksState.isLoggedIn).toBeTruthy();
});

// export default {}