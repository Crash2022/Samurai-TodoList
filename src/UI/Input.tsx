import React, {ChangeEvent, KeyboardEvent} from 'react';

export type InputPropsType = {
    inputValue: string
    setInputValue: (title: string) => void
    onKeyPress: () => void
    error: string
    setError: (errorTitle: string) => void
}

export const Input = (props: InputPropsType) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        //props.setInputValue(event.currentTarget.value)
        let trimName = event.currentTarget.value.trim()
        if (trimName) {
            props.setInputValue(trimName);
            props.error && props.setError('');
        } else {
            props.inputValue && props.setError('')
            props.setError('Поле должно начинаться без пробела!');
        }
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