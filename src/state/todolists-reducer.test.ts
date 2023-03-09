import {TodolistDomainType, FilterType, todolistsReducer,
    updateTodolistFilterAC, changeTodolistEntityStatusAC, deleteTodolistTC,
    createTodolistTC, updateTodolistTitleTC, getTodolistsTC,} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";
import {AppInitialStateStatusType} from "./app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = ([
        {id: todolistId1, title: 'Выучить', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'Купить', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ])
})

test('correct todolist should be deleted', () => {

    const endState = todolistsReducer(startState, deleteTodolistTC.fulfilled({todolistId: todolistId1},
        'requestId', 'todolistId1'));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolist = {
        todoListId: 'todolistId1', id: '1', title: 'New Todolist',
        status: TaskStatuses.New, priority: TaskPriorities.Middle,
        description: '', addedDate: '', startDate: '', deadline: '', order: 0
    };
    const endState = todolistsReducer(startState, createTodolistTC.fulfilled({todolist: newTodolist},
        'requestId', {id: '1', title: 'New Todolist', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle' }));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New Todolist');
    expect(endState[0].filter).toBe('all');
});

test('update todolist title', () => {

    let updatedTodolistTitle = 'New Todolist';

    const action = updateTodolistTitleTC.fulfilled({id: todolistId1, title: updatedTodolistTitle},
        'requestId', {todolistId: 'todolistId1', title: updatedTodolistTitle});
    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(updatedTodolistTitle);
    expect(endState[1].title).toBe('Купить');
});

test('update todolist filter', () => {

    const updatedTodolistFilter: FilterType = 'active';

    const action = updateTodolistFilterAC({id: todolistId1, filter: updatedTodolistFilter});
    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('all');
    expect(endState[0].filter).toBe(updatedTodolistFilter);
});

test('change todolist entity status', () => {

    const newEntityStatus: AppInitialStateStatusType = 'loading';

    const action = changeTodolistEntityStatusAC({id: todolistId1, entityStatus: newEntityStatus});
    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe(newEntityStatus);
    expect(endState[1].entityStatus).toBe('idle');
});

/*-----------------------------------------------------------------------------------*/

test('todolists should be set to the state', () => {

    const endState = todolistsReducer([], getTodolistsTC.fulfilled({todolists: startState}, 'requestId'));

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistId1);
});