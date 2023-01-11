import {appSetInitializedAC, appSetStatusAC, initializeAppTC_WorkerSaga} from "./app-reducer";
import {call, put} from "redux-saga/effects";
import {authAPI, MeResponseType} from "../api/todolistsAPI";
import {setIsLoggedInAC} from "./login-reducer";
import {handleServerAppErrorSaga} from "../common/utils/errorUtils";

let meResponse: {data:MeResponseType}

beforeEach(() => {
    meResponse = {
        data: {
            resultCode: 0,
            data: {
                id: 1,
                email: 'myEmail@gmail.com',
                login: 'myLogin'
            },
            messages: [ ]
        }
    }
})

test('initializeAppTC_WorkerSaga login success', () => {

    const gen = initializeAppTC_WorkerSaga();
    let result = gen.next();
    expect(result.value).toEqual(call(authAPI.authMe));

    result = gen.next(meResponse);
    expect(result.value).toEqual(put(setIsLoggedInAC(true)))
    // result = gen.next(meResponse);
    // expect(result.value).toEqual(put(appSetStatusAC('succeeded')))
    result = gen.next();
    expect(result.value).toEqual(put(appSetInitializedAC(true)))
});

test('initializeAppTC_WorkerSaga login unsuccessful', () => {

    const gen = initializeAppTC_WorkerSaga();
    let result = gen.next();
    expect(result.value).toEqual(call(authAPI.authMe));

    meResponse.data.resultCode = 1;
    result = gen.next(meResponse);
    expect(result.value).toEqual(handleServerAppErrorSaga(meResponse.data))
    result = gen.next(meResponse);
    expect(result.value).toEqual(put(appSetInitializedAC(true)))
});

// export default {}