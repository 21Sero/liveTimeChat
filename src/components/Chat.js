import React, {useEffect, useState} from 'react';
import { addDoc, collection, serverTimestamp,onSnapshot, query, where, orderBy } from "firebase/firestore"
import {db, auth} from "../firebase-config";
import "../styles/chat.css"
const Chat = (props) => {
    const {room} = props
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const messagesRef = collection(db, "messages")

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"))
        const unSubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = []
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            })
            console.log(messages)
            setMessages(messages);
        })
        return () => unSubscribe()
    }, []  )
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage === "") return

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,

        })
        setNewMessage("")
    }
    return (
        <div className="chat-app">
            <div className="header">
                <h1> Welcome to: {room.toUpperCase()} </h1>
            </div>
            <div className="messages"> {messages.map((message) => <div className="message" key={message.id}>
                <span className="user"> {message.user}: </span>
                    {message.text}

            </div>
            )}

            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    className="new-message-input"
                    placeholder="type your message here"
                    onChange={ (e) => setNewMessage(e.target.value)  }
                    value={newMessage}
                />
                <button className="send-button" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
