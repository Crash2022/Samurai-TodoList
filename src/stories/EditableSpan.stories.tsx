import React from 'react';
import {EditableSpan} from "../UI/EditableSpan";
import {ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'EditableSpan StoryComponent',
    component: EditableSpan
} as ComponentMeta<typeof EditableSpan>;

const callback = action('Title was changed inside EditableSpan');

export const EditableSpanExample = (props: any) => {
    return (
        <EditableSpan title={'Click to change this title'} onChangeInput={callback}/>
    );
}