import React, {  useState } from "react";
//import logo from './logo.png';
import "./App.css";
import Messenger from "./Component/Messenger";
import { Row, Col, CardGroup, ListGroupItem } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

function App() {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    { content: "Hi there!! You can ask me question", from: "bot" },
  ]);
  const [userQuesAns, setUserQuesAns] = useState([]);
  const [questions, setQuestions] = useState();
  const [historyFlag, setHistoryFlag] = useState(false);
  const [historyQues, setHistoryQues] = useState([]);
  

  const sendMessage = (content, from) => {
    // add the message to the state

    setHistoryFlag(false);

    setMessages((prevState) => [
      ...prevState,
      {
        content: content,
        from: from,
      },
    ]);

    axios.get("MessengerAPI.json").then((res) => {
      //  console.log('res',res);
      setQuestions(res.data.questions);

      let matched = res.data.questions.filter((item, index) => {
        if (item.question == messageInput) {
          return item.answer;
        } else {
          return "";
        }
      });

      let userQuesAnsTemp = res.data.questions.filter((item, index) => {
        if (item.question == messageInput) {
          return item;
        } else {
          return;
        }
      });

      console.log("matched", matched);

      //     console.log('userQuesAnsTemp', userQuesAnsTemp);

      let gg = userQuesAns.filter(
        (e) => e.content == userQuesAnsTemp[0]?.question
      );
      if (gg.length == 0) {
        if (userQuesAnsTemp.length) {
          setUserQuesAns((prevState) => [
            ...prevState,
            {
              content: userQuesAnsTemp[0].answer,
              from: "bot",
            },
            {
              content: userQuesAnsTemp[0].question,
              from: "user",
            },
          ]);
        }
      }

      if (matched.length == 0) {
        setMessages((prevState) => [
          ...prevState,
          {
            content:
              "Oops, I don't understand. Please ask me a different question",
            from: "bot",
          },
        ]);
      } else {
        setMessages((prevState) => [
          ...prevState,
          {
            content: matched[0].answer,
            from: "bot",
          },
        ]);
      }
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    sendMessage(messageInput, "user");
    setMessageInput("");
    setHistoryFlag(false);
  };



  const handlePreviousQues = (bb) => {
    setHistoryFlag(true);
    let temp = [];
    setHistoryQues([]);
    let matched = questions.filter((item, index) => {
      if (item.question == bb) {
        return item;
      } else {
        return "";
      }
    });

    if (matched.length == 0) {
      let obj = {
        content: "Oops, I don't understand. Please ask me a different question",
        from: "bot",
      };
      temp.push(obj);
      setHistoryQues(temp);
    } else {
      let obj1 = [
        {
          content: matched[0].question,
          from: "user",
        },
        {
          content: matched[0].answer,
          from: "bot",
        },
      ];

      setHistoryQues(obj1);
    }
  };



  return (
    <>
      <Container>
        <CardGroup>
          <Card
            bg="dark"
            text="light"
            border="light"
            className="historyClass"
            style={{ maxWidth: "500", marginTop: "20px" }}
          >
            <Card.Header border="light">Questions History</Card.Header>

            <Card.Body>
              {userQuesAns.map((element, index) => (
                <ListGroup key={index} >
                  {element.from == "user" ? (
                    <>
                      <ListGroupItem className="listHistory"
                        onClick={() => handlePreviousQues(element.content)}
                      >
                        {element.content}
                      </ListGroupItem>
                    </>
                  ) : (
                    <></>
                  )}
                </ListGroup>
              ))}
            </Card.Body>
          </Card>

          <Card style={{ maxWidth: "900", marginTop: "20px" }} className="scrollChat"
>
            <Card.Header style={{ background:'cadetblue' }}>Robobob ChatBot</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              {!historyFlag && (
                <Card.Text>
                  {messages.map((element, index) => (
                    <Messenger key={index} item={element} historyFlag={false} />
                  ))}
                </Card.Text>
              )}
              {historyFlag && (
                <Card.Text>
                  {historyQues.map((element, index) => (
                    <Messenger key={index} item={element} historyFlag={true} />
                  ))}
                </Card.Text>
              )}
              <Card.Footer>
                <Form>
                  <Row>
                    <Col className="col-10">
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          value={messageInput}
                          onChange={(event) =>
                            setMessageInput(event.target.value)
                          }
                          placeholder="Type your question"
                        />
                      </Form.Group>
                    </Col>

                    <Col className="col-2">
                      <Button variant="primary" onClick={handleSubmit}>
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Footer>
            </Card.Body>
          </Card>
        </CardGroup>
        <Col></Col>
      </Container>
    </>
  );
}

export default App;
