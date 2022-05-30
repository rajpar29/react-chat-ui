import { Card, CardMedia } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Message } from '../../models/Message.model';
import './message-list.scss'

export type MessageListProps = {
    messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = (props) => {
    const { messages } = props;
    return (
        <Container maxWidth='md' component='div' className='message-list'>
            {
                messages.map((msg: Message) => (
                    <Card
                        key={msg.timestamp}
                        className='message-card'
                        sx={{ boxShadow: 'none', borderRadius: '8px', maxWidth: '254px' }}>
                        {msg.image && <CardMedia component='img' src={msg.image}></CardMedia>}
                        {msg.text}
                    </Card>
                )
                )
            }
        </Container >
    )
}
