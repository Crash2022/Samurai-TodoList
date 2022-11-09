import {TasksListType, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, setTodolistsAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";

// test('IDs should be equal', () => {
//
//     const startTasksState: TasksListType = {};
//     const startTodolistsState: Array<TodolistDomainType> = [];
//
//     // const action = addTodolistAC('newTodolist');
//     const action = addTodolistAC({
//         todoListId: 'todolistId1', id: v1(), title: 'New Todolist',
//         status: TaskStatuses.New, priority: TaskPriorities.Middle,
//         description: '', addedDate: '', startDate: '', deadline: '', order: 0
//     });
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