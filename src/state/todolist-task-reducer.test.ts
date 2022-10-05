import {TaskListType, TodoListType} from "../App";
import {taskReducer} from "./task-reducer";
import {addTodolistAC, todolistReducer} from "./todolist-reducer";

test('IDs should be equal', () => {

    const startTasksState: TaskListType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodolistAC('newTodolist');

    const endTasksState = taskReducer(startTasksState, action);
    const endTodolistsState = todolistReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});