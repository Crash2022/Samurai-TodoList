import React, {ChangeEvent, KeyboardEvent} from 'react';

export type InputPropsType = {
    inputValue: string
    setInputValue: (title: string)=>void
    //callBackButtonHandler: (event: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = (props: InputPropsType) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setInputValue(event.currentTarget.value)
    }

    /*const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key = "Enter") {
            props.callBackButtonHandler
        }
    }*/

    return (
        <input value={props.inputValue} onChange={onChangeInputHandler} />
    );
}