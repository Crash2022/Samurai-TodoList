import React, {ChangeEvent, KeyboardEvent} from 'react';
import styles from "../components/Todolist.module.css";

export type InputPropsType = {
    inputValue: string
    setInputValue: (title: string) => void
    /*callback: () => void*/
    onKeyPress: () => void
    error: string
    setError: (errorTitle: string) => void
}

export const Input = (props: InputPropsType) => {

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setInputValue(event.currentTarget.value)
        /*let trimName = event.currentTarget.value.trim()
        if(trimName) {
            props.setInputValue(trimName);
            props.error && props.setError('');
        } else {
            props.inputValue && props.setError('')
            props.setError('Поле должно начинаться без пробела!');
        }*/
    }
    /*const callbackHandler = () => {
        props.callback()
    }*/

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        props.setError('')
        return event.key === "Enter" ? props.onKeyPress() : ''
    }

    const inputClass = `${props.error ? styles.inputError : styles.inputClass}`

    return (
        <input value={props.inputValue}
               onChange={onChangeInputHandler}
               /*callback={callbackHandler} />*/
               onKeyDown={onKeyDownHandler}
               className={inputClass}/>
    );
}