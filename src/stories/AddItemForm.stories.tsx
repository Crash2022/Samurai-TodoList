import React from 'react';
import {AddItemForm} from "../UI/AddItemForm";
import {ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm StoryComponent',
    component: AddItemForm
} as ComponentMeta<typeof AddItemForm>;

const callback = action('Button ADD was pressed inside AddItemForm');

export const AddItemFormExample = (props: any) => {
    return (
        <AddItemForm addItem={callback}/>
    );
}