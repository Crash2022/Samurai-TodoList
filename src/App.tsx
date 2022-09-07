import React, {ChangeEvent, useState} from 'react'
import {v1} from 'uuid'
import './App.css'
import {Todolist} from './components/Todolist'

/*https://samuraitodo.herokuapp.com/*/

export type FilterType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

const App = () => {
    //const title1 = "What 2022-2023";
    //const title2 = "What 2023";

    /*const [tasks1,setTasks1] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "React Native", isDone: false }

    ])*/
    /* let tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false },
        { id: 3, title: "No", isDone: false }
    ] */

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState <Array<TodoListType>> ([
        { id: todolistId1, title: 'What to learn', filter: 'active'},
        { id: todolistId2, title: 'What to buy', filter: 'completed'}
    ])

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "React Native", isDone: false }],
        [todolistId2]: [
            { id: v1(), title: "Hello world", isDone: true },
            { id: v1(), title: "I am Happy", isDone: false }]
    })

    /*------------------------------------------------*/

    const removeTask = (taskId: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let removedTask = tasks.filter(t => t.id !== taskId);
        tasksObj[todolistId] = removedTask;
        setTasks({...tasksObj});
    }

    /*------------------------------------------------*/

    const filterTask = (filterValue: FilterType, todolistId: string) => {
        let todolist = todolists.find(td => td.id === todolistId);
        if (todolist) {
            todolist.filter = filterValue;
            setTodolists([...todolists]);
        }
    }

    /*------------------------------------------------*/

    const addTask = (titleInput:string, todolistId: string) => {
        let newTask = {id: v1(), title: titleInput, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    /*------------------------------------------------*/

    const changeCheckbox = (taskId: string, isDone: boolean, todolistId: string) => {

        // Простой способ
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }

        // Сложный способ из четверга
        // (taskId: string, newIsDoneValue: boolean)
        //setTasks1(tasks1.map(el=>el.id===taskId ? {...el, isDone: newIsDoneValue} :el))
    }

    /*------------------------------------------------*/

    return (
        <div className="App">
            {
                todolists.map(todo=>{

                    let filteredTasks = tasksObj[todo.id];

                    if (todo.filter === 'active') {
                        filteredTasks = filteredTasks.filter(f => !f.isDone)
                    }
                    if (todo.filter === 'completed') {
                        filteredTasks = filteredTasks.filter(f => f.isDone)
                    }

                    return (
                        <Todolist
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            tasks={filteredTasks}
                            removeTask={removeTask}
                            filterTask={filterTask}
                            addTask={addTask}
                            changeCheckbox={changeCheckbox}
                            filter={todo.filter}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;