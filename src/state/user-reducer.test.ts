import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = {age: 25, childrenCount: 1, name: 'RedBull'};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});

    expect(endState.age).toBe(26);
    expect(endState.childrenCount).toBe(1);
});

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 25, childrenCount: 1, name: 'RedBull'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});

    expect(endState.childrenCount).toBe(2);
    expect(endState.age).toBe(25);
});

test('user reducer should change user name', () => {
    const startState = {age: 25, childrenCount: 1, name: 'RedBull'};
    const newName = 'Rampage'
    const endState = userReducer(startState, {type: 'CHANGE-USER-NAME', newName: newName});

    expect(endState.name).toBe(newName);
    expect(endState.age).toBe(25);
});