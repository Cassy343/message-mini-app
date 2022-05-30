import { Box, Button, Stack, TextField } from "@mui/material";
import { useRef } from "react";
import { getUser } from "./Api";

function handleLogin(usernameRef, setUser) {
    getUser(usernameRef.current.value)
        .then(res => setUser(res.data));
}

function SignIn(props) {
    const usernameRef = useRef();

    return (<Box id='login-container'>
        <Stack
            direction='column'
            alignItems='center'
            justifyContent='flex-start'
            spacing={3}
            height='100%'
        >
            <Box height='30vh' />
            <TextField
                label='Username'
                inputRef={usernameRef}
            />
            <Button
                variant='contained'
                onClick={() => handleLogin(usernameRef, props.setUser)}
            >Login</Button>
        </Stack>
    </Box>);
}

export default SignIn;