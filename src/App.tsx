import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterType = 'all' | 'active' | 'completed'

const App = () => {
    const title1 = "What 2022";
    const title2 = "What 2023";

    const [tasks1,setTasks1] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])
    let tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false },
        { id: 3, title: "No", isDone: false }
    ]

    /*const [filterValue, setFilterValue] = useState('all');

    let filteredTasks = tasks1;

    if (filterValue === 'active') {
        filteredTasks = tasks1.filter((element) => !element.isDone);
    }
    if (filterValue === 'completed') {
        filteredTasks = tasks1.filter((element) => element.isDone);
    }

    const filterTasks = (filterVal: FilterType) => {
        setFilterValue(filterVal);
    }*/

    const removeTask = (taskId:number) => {
        let filteredTasks1 = tasks1.filter(task=>task.id !== taskId);
        setTasks1(filteredTasks1);
    }

    return (
        <div className="App">
            <Todolist title={title1} tasks={filteredTasks} removeTask={removeTask} filterTasks={filterTasks}/>
            {/*<Todolist title={title2} tasks={tasks2} />*/}
        </div>
    );
}

export default App;