import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "../components/Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Task StoryComponent',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

// короткая запись
// export const TaskExample = () => {
//     return (
//         <>
//             <Task todolistId={'todolistId1'}
//                   task={ {id: '1', title: "HTML&CSS", isDone: true} }
//             />
//             <Task todolistId={'todolistId2'}
//                   task={ {id: '2', title: "React", isDone: false} }
//             />
//         </>
//     );
// }

// подробная запись
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

export const TaskIsDoneStory = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    todolistId: 'todolistId1',
    task: {id: '1', title: "HTML&CSS", isDone: true}
}

export const TaskIsNotDoneStory = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    todolistId: 'todolistId2',
    task: {id: '2', title: "React", isDone: false}
}