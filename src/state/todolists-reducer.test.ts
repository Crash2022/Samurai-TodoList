import {TodolistDomainType, FilterType,
    deleteTodolistAC, createTodolistAC,
    updateTodolistTitleAC, updateTodolistFilterAC,
    todolistsReducer, setTodolistsAC} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [ ];

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = ([
        {id: todolistId1, title: 'Выучить', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'Купить', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ])
})

test('correct todolist should be deleted', () => {

    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolist = {
        todoListId: 'todolistId1', id: '1', title: 'New Todolist',
        status: TaskStatuses.New, priority: TaskPriorities.Middle,
        description: '', addedDate: '', startDate: '', deadline: '', order: 0
    };

    const endState = todolistsReducer(startState, createTodolistAC(newTodolist));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New Todolist');
    expect(endState[0].filter).toBe('all');
});

test('update todolist title', () => {

    let updatedTodolistTitle = 'New Todolist';

    const action = updateTodolistTitleAC(todolistId1, updatedTodolistTitle);
    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(updatedTodolistTitle);
    expect(endState[1].title).toBe('Купить');
});

test('update todolist filter', () => {

    const updatedTodolistFilter: FilterType = 'active';

    /*const action: ChangeTodolistFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId1,
        filter: changedTodolistFilter
    }*/

    const action = updateTodolistFilterAC(todolistId1, updatedTodolistFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('all');
    expect(endState[0].filter).toBe(updatedTodolistFilter);
});

/*-----------------------------------------------------------------------------------*/

test('todolists should be set to the state', () => {

    const endState = todolistsReducer([], setTodolistsAC(startState));

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistId1);
});