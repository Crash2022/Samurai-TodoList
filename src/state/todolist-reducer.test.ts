import {
    RemoveTodolistAC,
    AddTodolistAC,
    ChangeTodolistTitleAC,
    ChangeTodolistFilterAC,
    todolistReducer
} from "./todolist-reducer";
import {v1} from "uuid";
import {FilterType, TodoListType} from "../App";

test('correct todolist should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState = <Array<TodoListType>>([
        {id: todolistId1, title: 'Выучить', filter: 'all'},
        {id: todolistId2, title: 'Купить', filter: 'all'}
    ])

    /*const endState = todolistReducer(startState,
        {
            type: 'REMOVE-TODOLIST',
            id: todolistId1
        }
    )*/

    const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState = <Array<TodoListType>>([
        {id: todolistId1, title: 'Выучить', filter: 'all'},
        {id: todolistId2, title: 'Купить', filter: 'all'}
    ])

    let newTodolistTitle = 'New Todolist'

    /*const endState = todolistReducer(startState,
        {
            type: 'ADD-NEW-TODOLIST',
            title: newTodolistTitle
        }
    )*/

    const endState = todolistReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
});

test('change todolist title', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState = <Array<TodoListType>>([
        {id: todolistId1, title: 'Выучить', filter: 'all'},
        {id: todolistId2, title: 'Купить', filter: 'all'}
    ])

    let changedTodolistTitle = 'New Todolist';

    /*const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId1,
        title: changedTodolistTitle,
    }*/

    const action = ChangeTodolistTitleAC(todolistId1, changedTodolistTitle);
    const endState = todolistReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(changedTodolistTitle);
    expect(endState[1].title).toBe('Купить');
});

test('change todolist filter', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState = <Array<TodoListType>>([
        {id: todolistId1, title: 'Выучить', filter: 'all'},
        {id: todolistId2, title: 'Купить', filter: 'all'}
    ])

    const changedTodolistFilter: FilterType = 'active';

    /*const action: ChangeTodolistFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId1,
        filter: changedTodolistFilter
    }*/

    const action = ChangeTodolistFilterAC(todolistId1, changedTodolistFilter);

    const endState = todolistReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('all');
    expect(endState[0].filter).toBe(changedTodolistFilter);
});