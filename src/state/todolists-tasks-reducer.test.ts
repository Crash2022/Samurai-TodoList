import {TasksListType, tasksReducer} from './tasks-reducer';
import {TodolistDomainType, todolistsReducer, todolistsThunks} from './todolists-reducer';

test('IDs should be equal', () => {

    const startTasksState: TasksListType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = todolistsThunks.createTodolistTC.fulfilled({todolist: {id: '1', title: 'New Todolist', addedDate: '', order: 0}},
        'requestId', {id: '1', title: 'New Todolist', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'});

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});