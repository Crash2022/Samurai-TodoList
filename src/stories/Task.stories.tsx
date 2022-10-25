import React from 'react';
import {ComponentMeta} from "@storybook/react";
//import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";
import {useDispatch} from "react-redux";

export default {
    title: 'Task StoryComponent',
    component: Task
} as ComponentMeta<typeof Task>;

//const callback = action('Button ADD was pressed inside AddItemForm');

export const TaskBaseExample = () => {
    return (
        <>
            Task

            {/*<Task todolistId={'todolistId1'}
                  task={ {id: '1', title: "HTML&CSS", isDone: true} }
            />
            <Task todolistId={'todolistId2'}
                  task={ {id: '2', title: "React", isDone: false} }
            />*/}
        </>

    );
}