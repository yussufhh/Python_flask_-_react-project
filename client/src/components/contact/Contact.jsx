import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

// npm install @emailjs/browser

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // For button disabling
  const [messageStatus, setMessageStatus] = useState(""); // Success/Failure message
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Start by disabling the button to prevent multiple submissions
    setIsSubmitting(true);
    setMessageStatus(""); // Reset message status before each submission

    emailjs
      .sendForm(
        "service_1ws2jjr",  // Your service ID
        "template_835repp",  // Your template ID
        form.current,
        "Q_f5AZTNQmadYAmQh" // Your public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setMessageStatus("Message sent successfully!");
          form.current.reset(); // Clear the form fields after successful submission
        },
        (error) => {
          console.log(error.text);
          setMessageStatus("Failed to send the message. Please try again.");
        }
      )
      .finally(() => {
        setIsSubmitting(false); // Re-enable button after submission
      });
  };

  return (
    <StyledContactForm>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" required />
        
        <label>Email</label>
        <input type="email" name="user_email" required />
        
        <label>Message</label>
        <textarea name="message" required />
        
        <input 
          type="submit" 
          value={isSubmitting ? "Sending..." : "Send"} 
          disabled={isSubmitting} 
        />

        {/* Displaying status message after submission */}
        {messageStatus && <MessageStatus isSuccess={messageStatus === "Message sent successfully!"}>{messageStatus}</MessageStatus>}
      </form>
    </StyledContactForm>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; // Centers the form vertically
  width: 100%;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    max-width: 400px; // Set a max width for the form
    font-size: 16px;

    input, textarea {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
      &:disabled {
        background: rgb(180, 180, 180);
      }
    }
  }
`;

// Status Message
const MessageStatus = styled.div`
  margin-top: 1rem;
  color: ${(props) => (props.isSuccess ? "green" : "red")};
  font-weight: bold;
`;
