import {appSetErrorAC, appSetStatusAC} from "./app-reducer";
import {call, put} from "redux-saga/effects";
import {
    TaskPriorities,
    TasksResponseType,
    TaskStatuses,
    todolistsAPI
} from "../api/todolistsAPI";
import {createTaskTC_WorkerSaga, getTasksTC_WorkerSaga, setTasksAC} from "./tasks-reducer";

test('getTasksTC_WorkerSaga success', () => {

    const todolistId = 'todolistId1'

    const gen = getTasksTC_WorkerSaga({type: 'TASKS/GET_TASKS', todolistId: todolistId})
    expect(gen.next().value).toEqual(put(appSetStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsAPI.getTasks, todolistId))

    const fakeResponse: TasksResponseType = {
        error: '',
        totalCount: 1,
        items: [{
            todoListId: todolistId, id: '1', title: 'HTML&CSS',
            status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
            description: '', addedDate: '', startDate: '', deadline: '', order: 0
        }]
    }
    expect(gen.next(fakeResponse).value).toEqual(put(setTasksAC(todolistId, fakeResponse.items)))
    expect(gen.next().value).toEqual(put(appSetStatusAC('succeeded')))
});

test('createTaskTC_WorkerSaga unsuccessful', () => {

    const task = {
        todoListId: 'todolistId1', id: '1', title: 'HTML&CSS',
        status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
        description: '', addedDate: '', startDate: '', deadline: '', order: 0
    }

    const gen = createTaskTC_WorkerSaga({type: 'TASKS/CREATE_TASK', task})
    expect(gen.next().value).toEqual(put(appSetStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsAPI.createTask, task))
    expect(gen.throw({ message: 'Some error' }).length).toEqual(put(appSetErrorAC('Some error')))
    expect(gen.next().value).toEqual(put(appSetStatusAC('failed')))

});

// export default {}