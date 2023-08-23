import React, { useState } from "react";
import Card from "react-bootstrap/Card";

import { Avatar } from "@mui/material";
import avatar from "../assets/bot.png";  // Adding all the modules

function Messenger(props) { // getting the props and populating the data into the component
 // console.log("props", props);
  return (
    <>
      <Card className="answerQuestionCard"
        style={{
          display: "flex",
          marginBottom: "2px",
          marginTop: "5px",
          flexFlow: "row",
          border:'0px',
          justifyContent: props.item.from == 'user' ? "right" : "left",
        }}
      >
        {props.item.from == 'bot' && (
          <Avatar sx={{ mr: 1, bgcolor: "primary.main" }}>
            <img src={avatar} alt="Chatbot avatar" width={32} />
          </Avatar>
        )}
        <Card style={{border:'0px', marginTop: "5px", marginBottom: "5px"}}>{props.item.content}</Card>
      </Card>
    </>
  );
}


export default Messenger;
