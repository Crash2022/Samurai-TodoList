import React, {ChangeEvent} from 'react';

export type InputPropsType = {
    inputValue: string
    setInputValue: (title: string)=>void
}

export const Input = (props: InputPropsType) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setInputValue(event.currentTarget.value)
    }

    return (
        <input value={props.inputValue} onChange={onChangeInputHandler}/>
    );
}