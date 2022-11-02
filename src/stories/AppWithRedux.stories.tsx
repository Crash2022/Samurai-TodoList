import React from 'react';
import {ComponentMeta} from "@storybook/react";
import {AppWithRedux} from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux StoryComponent',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

export const AppWithReduxBaseExample = () => {
    return (
            <AppWithRedux/>
    );
}