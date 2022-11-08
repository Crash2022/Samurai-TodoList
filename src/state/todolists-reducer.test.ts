import {TodolistDomainType, FilterType,
    removeTodolistAC, addTodolistAC,
    changeTodolistTitleAC, changeTodolistFilterAC,
    todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = ([
        {id: todolistId1, title: 'Выучить', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'Купить', filter: 'all', addedDate: '', order: 0}
    ])
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
});

test('change todolist title', () => {

    let changedTodolistTitle = 'New Todolist';

    const action = changeTodolistTitleAC(todolistId1, changedTodolistTitle);
    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(changedTodolistTitle);
    expect(endState[1].title).toBe('Купить');
});

test('change todolist filter', () => {

    const changedTodolistFilter: FilterType = 'active';

    /*const action: ChangeTodolistFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId1,
        filter: changedTodolistFilter
    }*/

    const action = changeTodolistFilterAC(todolistId1, changedTodolistFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('all');
    expect(endState[0].filter).toBe(changedTodolistFilter);
});