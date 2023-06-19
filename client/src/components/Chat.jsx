import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import socket from '../store/socket';



const Chat = () => {
    const { user, loading,socketId } = useSelector(state => state.userReducer);
    let [inputValue, setInputValue] = useState('');
    let [messages, setMessages] = useState([]);
    let socketRef = useRef(socket);
    

    useEffect(() => {
        socketRef.current.on('chatmessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
          });
      
          // Component kaldırıldığında veya güncellendiğinde
          return () => {
            socketRef.current.disconnect(); // Socket bağlantısını sonlandır
          };
    }, []);

    const send = () => {

        let socketMessage={
            id:socketId,
            message:inputValue
        }
        socketRef.current.emit('chat', socketMessage);
        setInputValue('');
    };
    const handleChange = (event) => {   
        event.preventDefault();
        setInputValue(event.target.value);
      };
    return (
        <div>
            <div>
                <label htmlFor="message">Message</label>
                <input type="text" name="" id="message" value={inputValue} onChange={handleChange} />
                <input type="text" style={{display:"none"}} />
                {/* <input type="submit" value="send" onClick={send}/> */}
                <button onClick={send}>send</button>

            </div>

            <ul>

                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    )
}

export default Chat
