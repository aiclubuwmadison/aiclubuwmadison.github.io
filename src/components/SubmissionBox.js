import React, { useState } from 'react';
import axios from 'axios';


const SubmissionBox = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("Submit");

    const handleChange = (e) => {
        const field = e.target.id;
        if (field === "message")
            setMessage(e.target.value);
        else if (field === "email")
            setEmail(e.target.value);
        else if (field === "name")
            setName(e.target.value);
            
    }

    const handleSubmit = (e) => {
        e.preventDefault();  
        setStatus("Sending");
        axios({
          method: "POST",
          url: "http://localhost:5000/contact_endpoint",
          data: {message, email, name, status},
        }).then((response) => {
          if (response.data.status === "sent") {
            alert("Message Sent");
            setMessage("");
            setEmail("");
            setName("");
            setStatus("Submit")
          } else if (response.data.status === "failed") {
            alert("Message Failed");
          }
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit} method="POST">
                <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={handleChange}
                    required
                />
                </div>
                <button type="submit">{status}</button>
            </form>      
        </>
    );
}

export default SubmissionBox;