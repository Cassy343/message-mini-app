import './App.css';
import axios from 'axios';
import { useState } from 'react';
import MessageBoard from './MessageBoard';
import SignIn from './SignIn';

function App() {
    // axios.get('http://localhost:8000/messages')
    //   .then(res => console.log(res.data));

    // axios.post('http://localhost:8000/messages', {
    //   authorId: 'hw4FLRlAAEed9QYnyhZK',
    //   content: 'Another message'
    // })
    //   .then(res => console.log(res));

    const [user, setUser] = useState(null);

    return (<>
        {
            user
            ? <MessageBoard user={user} />
            : <SignIn setUser={setUser} />
        }
    </>);
}

export default App;
