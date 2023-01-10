import {TasksListType, tasksReducer} from './tasks-reducer';
import {createTodolistAC, createTodolistTC, TodolistDomainType, todolistsReducer} from './todolists-reducer';

test('IDs should be equal', () => {

    const startTasksState: TasksListType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    // react-redux
    const action = createTodolistAC({id: '1', title: 'New Todolist', addedDate: '', order: 0});

    // redux-toolkit
    // const action = createTodolistTC.fulfilled({todolist: {id: '1', title: 'New Todolist', addedDate: '', order: 0}},
    //     'requestId', {id: '1', title: 'New Todolist', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'});

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    // expect(idFromTasks).toBe(action.payload.todolist.id);
    // expect(idFromTodolists).toBe(action.payload.todolist.id);
    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});

// export default {}