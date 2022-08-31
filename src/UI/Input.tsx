import React, {ChangeEvent, KeyboardEvent} from 'react';

export type InputPropsType = {
    inputValue: string
    setInputValue: (title: string) => void
    onKeyPress: () => void
}

export const Input = (props: InputPropsType) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setInputValue(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        return event.key === "Enter" ? props.onKeyPress() : ''
    }

    return (
        <input value={props.inputValue}
               onChange={onChangeInputHandler}
               onKeyDown={onKeyDownHandler} />
    );
}