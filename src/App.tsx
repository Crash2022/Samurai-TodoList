import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

const App = () => {
    const title1 = "What 2022";
    const title2 = "What 2023";

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false },
        { id: 3, title: "No", isDone: false }
    ]

    return (
        <div className="App">
            <Todolist title={title1} tasks={tasks1} price={100500} />
            <Todolist title={title2} tasks={tasks2} />
        </div>
    );
}

export default App;