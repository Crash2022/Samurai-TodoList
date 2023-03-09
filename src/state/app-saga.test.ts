// import {appSetErrorAC, appSetInitializedAC, appSetStatusAC, initializeAppTC_WorkerSaga} from './app-reducer';
// import {call, put} from "redux-saga/effects";
// import {authAPI, MeResponseType} from "../api/todolistsAPI";
// import {setIsLoggedInAC} from "./login-reducer";
// import {handleServerAppErrorSaga} from "../common/utils/errorUtils";
//
// let meResponse: {data:MeResponseType}
//
// beforeEach(() => {
//     meResponse = {
//         data: {
//             resultCode: 0,
//             data: {
//                 id: 1,
//                 email: 'myEmail@gmail.com',
//                 login: 'myLogin'
//             },
//             messages: [ ]
//         }
//     }
// })
//
// test('initializeAppTC_WorkerSaga login success', () => {
//
//     const gen = initializeAppTC_WorkerSaga()
//
//     expect(gen.next().value).toEqual(call(authAPI.authMe))
//     expect(gen.next(meResponse).value).toEqual(put(setIsLoggedInAC(true)))
//     expect(gen.next().value).toEqual(put(appSetInitializedAC(true)))
// });
//
// test('initializeAppTC_WorkerSaga login unsuccessful', () => {
//
//     const gen = initializeAppTC_WorkerSaga()
//     expect(gen.next().value).toEqual(call(authAPI.authMe))
//
//     meResponse.data.resultCode = 1
//     expect(gen.next(meResponse).value).toEqual(put(appSetErrorAC(meResponse.data.messages[0])))
//     expect(gen.next(meResponse).value).toEqual(put(appSetStatusAC('failed')))
//     expect(gen.next(meResponse).value).toEqual(put(appSetInitializedAC(true)))
// });

export default {}