import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    onChangeInput: (newInputValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    console.log('editable span')

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const onClickEditSpanHandler = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const onClickNotEditSpanHandler = () => {
        props.onChangeInput(title);
        setEditMode(false);
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const enterChangeTitle = (event: KeyboardEvent<HTMLInputElement>) => {
        return event.key === 'Enter' ? onClickNotEditSpanHandler() : '' ;
    }

    return (
            editMode
            ? <TextField
                  label="Измените текст"
                  variant="standard"
                  autoFocus
                  value={title}
                  onChange={onChangeInputHandler}
                  onBlur={onClickNotEditSpanHandler}
                  onKeyDown={enterChangeTitle}
              />
            : <span onDoubleClick={onClickEditSpanHandler}>{props.title}</span>
    );
})