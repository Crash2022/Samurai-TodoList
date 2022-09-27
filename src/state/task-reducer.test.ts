import {RemoveTaskAC, taskReducer} from "./task-reducer";
import {v1} from "uuid";
import {TaskListType} from "../App";

test('correct task should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState = <TaskListType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "React Native", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Notebook", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Bike", isDone: false},
        ]
    })

    //const action = RemoveTaskAC(todolistId1, startState[todolistId1][0]);

    //const endState = taskReducer(startState, action);

    //expect(endState.length).toBe(3);
    //expect(endState[0].id).toBe(todolistId2);
});
