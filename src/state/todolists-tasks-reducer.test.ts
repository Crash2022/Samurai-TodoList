import {TasksListType, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, setTodolistsAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";

// test('IDs should be equal', () => {
//
//     const startTasksState: TasksListType = {};
//     const startTodolistsState: Array<TodolistDomainType> = [];
//
//     const action = addTodolistAC('newTodolist');
//
//     const endTasksState = tasksReducer(startTasksState, action);
//     const endTodolistsState = todolistsReducer(startTodolistsState, action);
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//
//     expect(idFromTasks).toBe(action.todolistId);
//     expect(idFromTodolists).toBe(action.todolistId);
// });