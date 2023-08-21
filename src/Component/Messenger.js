import React, { useState } from "react";
import Card from "react-bootstrap/Card";

import { Avatar } from "@mui/material";
import avatar from "../assets/bot.png";

function Messenger(props) {
 // console.log("props", props);
  return (
    <>
      <Card className="answerQuestionCard"
        style={{
          display: "flex",
          marginBottom: "2px",
          marginTop: "2px",
          flexFlow: "row",
          border:'0px',
          justifyContent: props.item.isUser ? "right" : "left",
        }}
      >
        {!props.item.isUser && (
          <Avatar sx={{ mr: 1, bgcolor: "primary.main" }}>
            <img src={avatar} alt="Chatbot avatar" width={32} />
          </Avatar>
        )}
        <Card style={{border:'0px'}}>{props.item.content}</Card>
      </Card>
    </>
  );
}

// {props.item.isUser ? (<><Card.Text style={{float:'right'}}>{props.item.content} </Card.Text></>): (<></>)}

export default Messenger;
