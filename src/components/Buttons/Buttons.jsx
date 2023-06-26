import React from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


export const BaseButton = ({ children, onClick = ()=>{}, ...props }) => {
    return (
        <Button size="small" color="secondary" onClick={onClick} {...props}>{children}</Button>
    )
}

export const SendButton = ({ children, ...props }) => {
    return (
        <Button type="submit" size="small" color="secondary" {...props} endIcon={<SendIcon />}>{children}</Button>
    )
}