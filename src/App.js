import React, {  useState } from "react";
//import logo from './logo.png';
import "./App.css";
import Messenger from "./Component/Messenger"; // Importing the component Messenger
import { Row, Col, CardGroup, ListGroupItem } from "react-bootstrap"; // Importing rows, cols from react bootstrap
import Button from "react-bootstrap/Button"; 
import Card from "react-bootstrap/Card"; // Imported card from react bootstrap
import Form from "react-bootstrap/Form"; // Imported form from react bootstrap
import Container from "react-bootstrap/Container"; // Imported container from react bootstrap
import ListGroup from "react-bootstrap/ListGroup"; // Imported listgroup from react bootstrap
import axios from "axios"; // Impoted all modules

function App() {
  const [messageInput, setMessageInput] = useState(""); // Initialising the text input box.
  const [messages, setMessages] = useState([
    { content: "Hi there!! You can ask me question", from: "bot" },
  ]); // Initialising the message array. Responses are from bot and users.
  const [userQuesAns, setUserQuesAns] = useState([]); // Setting an array consisting of list of questions and answers for the history access.
  const [questions, setQuestions] = useState(); // Assiging this array with the data being received from the API. Right now the API is hard coded.
  const [historyFlag, setHistoryFlag] = useState(false); // Flag used to show the previous questions and answers.
  const [historyQues, setHistoryQues] = useState([]); // Initialising the array which will contain previous asked questions.
  
  
  const sendMessage = (content, from) => {  // Function is called when the message is sent fro user.
    // add the message to the state

    setHistoryFlag(false);

    setMessages((prevState) => [ // Assiging the array set with the input got from user
      ...prevState,
      {
        content: content,
        from: from,
      },
    ]);

    axios.get("MessengerAPI.json").then((res) => { // Axios http call to get the predefined questions all at once.
      //  console.log('res',res);
      setQuestions(res.data.questions);

      let matched = res.data.questions.filter((item, index) => {
        if (item.question == messageInput) {
          return item.answer;
        } else {
          return "";
        }
      }); // filtering the question being asked by the user with the predefined questions

      let userQuesAnsTemp = res.data.questions.filter((item, index) => { 
        if (item.question == messageInput) {
          return item;
        } else {
          return;
        }
      });  // Filtering the question and getting the array with selected questions and answers

      let tempQnA = userQuesAns.filter(
        (e) => e.content == userQuesAnsTemp[0]?.question
      );
      if (tempQnA.length == 0) {
        if (userQuesAnsTemp.length) { // Assiging the array with questions and ansers from user and bot 
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

      if (matched.length == 0) { // Checking if the question being asked matches the predefined set of question
        setMessages((prevState) => [ 
          ...prevState,
          {
            content:
              "Oops, I don't understand. Please ask me a different question",
            from: "bot",
          },
        ]); // If any question being asked is out of the predefined set of questions then the bot answers to ask a diff question
      } else {
        setMessages((prevState) => [ // Else assign the answer
          ...prevState,
          {
            content: matched[0].answer,
            from: "bot",
          },
        ]);
      }
    });
  };


  const handleSubmit = (event) => { // Function being called on click of send button
    event.preventDefault();

    sendMessage(messageInput, "user");
    setMessageInput("");
    setHistoryFlag(false);
  };



  const handlePreviousQues = (val) => { // The area which has history questions are clickable. Function being called on click of each question which gives us the answer.
    setHistoryFlag(true);
    let temp = [];
    setHistoryQues([]);

    let matched = questions.filter((item, index) => { // filtering the question being clicked with predefined questions.
      if (item.question == val) {
        return item;
      } else {
        return "";
      }
    });

    if (matched.length == 0) { // Assiging the array with answers from bot.
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



  return ( // rendering part
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


