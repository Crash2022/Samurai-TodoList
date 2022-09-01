import React, {ChangeEvent, useState} from 'react'
import {v1} from 'uuid'
import './App.css'
import {Todolist} from './components/Todolist'

export type FilterType = 'all' | 'active' | 'completed'

const App = () => {
    const title1 = "What 2022";
    //const title2 = "What 2023";

    const [tasks1,setTasks1] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "React Native", isDone: false }

    ])
    /* let tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false },
        { id: 3, title: "No", isDone: false }
    ] */

    const removeTask = (taskId: string) => {
        let removedTask = tasks1.filter(elem=>elem.id !== taskId);
        setTasks1(removedTask);
    }

    const [filter, setFilter] = useState<FilterType>('all')
    let filteredTasks = tasks1;

    if (filter === 'active') {
        filteredTasks = filteredTasks.filter(elem=>!elem.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = filteredTasks.filter(elem=>elem.isDone)
    }

    const filterTask = (filterValue: FilterType) => {
        setFilter(filterValue);
    }

    /*------------------------------------------------*/

    const addTask = (titleInput:string) => {
        const newTask = {id:v1(), title:titleInput, isDone:false};
        setTasks1( [newTask, ...tasks1]);
    }

    /*------------------------------------------------*/

    const changeCheckbox = (taskId: string, isDone: boolean) => {
        let task = tasks1.find( t => t.id === taskId);
        if (task) { task.isDone = isDone; }
        setTasks1([...tasks1]);
    }

    return (
        <div className="App">
            <Todolist title={title1}
            tasks={filteredTasks}
            removeTask={removeTask}
            filterTask={filterTask}
            addTask={addTask}
            changeCheckbox={changeCheckbox}
            filter={filter}/>

            {/*<Todolist title={title2} tasks={tasks2} />*/}
        </div>
    );
}

export default App;