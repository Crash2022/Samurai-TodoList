import React from 'react';
import {ComponentMeta} from "@storybook/react";
import {Task} from "../components/Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Task StoryComponent',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

export const TaskBaseExample = () => {
    return (
        <>
            <Task todolistId={'todolistId1'}
                  task={ {id: '1', title: "HTML&CSS", isDone: true} }
            />
            <Task todolistId={'todolistId2'}
                  task={ {id: '2', title: "React", isDone: false} }
            />
        </>
    );
}