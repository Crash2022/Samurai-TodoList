import React, {ChangeEvent, KeyboardEvent} from 'react';

export type InputPropsType = {
    inputValue: string
    setInputValue: (title: string)=>void
    keyEnter: ()=> void
}

export const Input = (props: InputPropsType) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setInputValue(event.currentTarget.value)
    }
    const onKeyInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.keyEnter()
        }
    }

    return (
        <input value={props.inputValue} onChange={onChangeInputHandler} onKeyPress={onKeyInputHandler}/>
    );
}