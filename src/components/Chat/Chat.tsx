import { useState } from 'react';

import { Box } from '@mui/material';

import { MessageList } from '../MessageList/MessageList';
import { Message } from '../../models/Message.model';


export const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([
        { text: 'Hi There!', timestamp: 123 },
        { text: 'I am wysa - an AI chatbot built by Therapists', timestamp: 123123, image: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/250253/Wysa1_1_asmybe.png' },
        { text: 'I am here to understand your concerns and connect you with the best resources available to support you.', timestamp: 1232135124 },
        { text: 'Can I help?', timestamp: 3423423 },
    ]);
    return (
        <Box sx={{ height: '90vh', overflowY: 'auto' }}>
            <MessageList messages={messages}></MessageList>
        </Box>
    )
}
