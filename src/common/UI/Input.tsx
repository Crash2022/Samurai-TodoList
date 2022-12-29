import React, {ChangeEvent, KeyboardEvent} from 'react';
import styles from "../../features/Todolist/Todolist.module.css";

export type InputPropsType = {
    inputValue: string
    setInputValue: (value: string)=> void
    error: string | null
    setError: (errorTitle: string) => void
    onKeyPress: () => void
}

export const Input = (props: InputPropsType) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setInputValue(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        props.setError('')
        return event.key === "Enter" ? props.onKeyPress() : ''
    }

    const inputClass = `${props.error ? styles.inputError : styles.inputClass}`

    return (
            <input value={props.inputValue}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownHandler}
                   className={inputClass}
            />
    );
}