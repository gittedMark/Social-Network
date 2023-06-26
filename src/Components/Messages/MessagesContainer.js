import React from 'react';
import Dialogs from './Dialogs';
import Chat from './Chat';

const MessagesContainer = () => {
    return (
        <div>
            <Dialogs/>
            <Chat/>
        </div>
    );
};

export default MessagesContainer;