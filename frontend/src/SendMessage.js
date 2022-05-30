import { Box, TextField } from "@mui/material";
import { useRef } from "react";
import { sendMessage } from "./Api";

function handleSend(event, contentRef, props) {
    if (event.keyCode !== 13) {
        return;
    }

    const content = contentRef.current.value.trim();

    if (!content) {
        return;
    }

    sendMessage(props.user.id, content)
        .then(msg => props.addMessage(msg.data));

    contentRef.current.value = '';
}

function SendMessage(props) {
    const contentRef = useRef();

    return (<Box id='send-message-container'>
        <TextField
            inputRef={contentRef}
            onKeyDown={event => handleSend(event, contentRef, props)}
            placeholder='Type + press enter to send a message'
            sx={{ width: '100%' }}
        />
    </Box>)
}

export default SendMessage;