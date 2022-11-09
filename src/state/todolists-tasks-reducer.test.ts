import {TasksListType, tasksReducer} from "./tasks-reducer";
import {TodolistDomainType, createTodolistAC, todolistsReducer} from "./todolists-reducer";

test('IDs should be equal', () => {

    const startTasksState: TasksListType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = createTodolistAC({
        id: '1', title: 'New Todolist', addedDate: '', order: 0
    });

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});