import React from 'react';
import {ComponentMeta} from "@storybook/react";
import {AppWithRedux} from "../app/AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux StoryComponent',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

export const AppWithReduxExample = () => {
    return (
            <AppWithRedux demo={true}/>
    );
}