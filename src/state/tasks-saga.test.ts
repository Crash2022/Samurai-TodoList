import {appSetStatusAC} from "./app-reducer";
import {call, put} from "redux-saga/effects";
import {
    TaskPriorities,
    TasksResponseType,
    TaskStatuses,
    todolistsAPI
} from "../api/todolistsAPI";
import {getTasksTC_WorkerSaga, setTasksAC} from "./tasks-reducer";

test('getTasksTC_WorkerSaga success', () => {

    const todolistId = 'todolistId1'

    const gen = getTasksTC_WorkerSaga({type: 'TASKS/GET_TASKS', todolistId: todolistId});
    let result = gen.next();
    expect(result.value).toEqual(put(appSetStatusAC('loading')))

    result = gen.next();
    expect(result.value).toEqual(call(todolistsAPI.getTasks, todolistId));

    const fakeResponse: TasksResponseType = {
        error: '',
        totalCount: 1,
        items: [{
            todoListId: todolistId, id: '1', title: 'HTML&CSS',
            status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
            description: '', addedDate: '', startDate: '', deadline: '', order: 0
        }]
    }
    result = gen.next(fakeResponse);
    expect(result.value).toEqual(put(setTasksAC(todolistId, fakeResponse.items)))

    result = gen.next();
    expect(result.value).toEqual(put(appSetStatusAC('succeeded')))
});

// export default {}