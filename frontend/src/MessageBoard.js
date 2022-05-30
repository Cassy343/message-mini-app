import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllMessages, deleteMessage as apiDelMessage } from "./Api";
import Message from "./Message";
import SendMessage from "./SendMessage";

function MessageBoard(props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getAllMessages()
            .then(msgs => {
                setMessages(msgs.data)
            });
    }, []);

    function addMessage(msg) {
        const newMessages = [...messages];
        newMessages.push(msg);
        setMessages(newMessages);
    }

    function deleteMessage(id) {
        setMessages(messages.filter(msg => msg.id !== id));
        apiDelMessage(id);
    }

    function updateContent(id, newContent) {
        const newMessages = [...messages];
        newMessages.forEach(msg => msg.content = msg.id == id ? newContent : msg.content);
        setMessages(newMessages);
    }

    return (<Box id='message-board-container'>
        <Stack
            direction='column'
            alignItems='center'
            justifyContent='flex-start'
            width='100%'
            spacing={1}
        >
            {messages.map(msg => <Message
                key={msg.id}
                user={props.user}
                msg={msg}
                updateContent={content => updateContent(msg.id, content)}
                delete={() => deleteMessage(msg.id)}
            />)}
            <SendMessage
                user={props.user}
                addMessage={addMessage}
            />
        </Stack>
    </Box>);
}

export default MessageBoard;