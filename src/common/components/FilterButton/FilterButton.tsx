import {Button} from '@material-ui/core';
import {FilterType} from '../../../state/todolists-reducer';
import React from 'react';
import {PropTypes} from '@mui/material';

type FilterButtonPropsType = {
    onClick: () => void
    filter: FilterType
    selectedFilter: FilterType
    color: PropTypes.Color
    buttonName: string
}

export const FilterButton: React.FC<FilterButtonPropsType> =
    ({onClick, filter, selectedFilter, color, buttonName}) => {
    return (
        <Button onClick={onClick}
                variant={selectedFilter === filter ? 'contained' : 'text'}
                color={color}
        >
            {buttonName}
        </Button>
    )
}