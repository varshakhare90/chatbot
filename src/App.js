import React,{useState} from 'react';
//import logo from './logo.png';
import './App.css';
import Messenger from './Component/Messenger';
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from 'axios';


function App() {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([{content:'Hi there!! You can ask me question',isUser: false}]);

  const [questions, setQuestions] = useState();

  const sendMessage = (content) => {
    // add the message to the state
    setMessages((current) => [...current, {
      content: content,
      isUser: true
    }]);

    axios.get('MessengerAPI.json').then(res => {
      console.log('res',res);
      setQuestions(res.data.questions);
      
      let matched = res.data.questions.filter((item, index) =>
        {
          if(item.question == messageInput){
             
            return item.answer;
          }else{
            return '';
          }
          
        });
        console.log('matched', matched);

        if(matched.length == 0){

          setMessages(prevState => [
            ...prevState,{
              content:"Oops, I don't understand. Please ask me a different question", 
              isUser:false
            }
          ]);

        }else{

          setMessages(prevState => [
            ...prevState,{
              content:matched[0].answer, 
              isUser:false
            }
          ]);

        }
      
    });

    setTimeout(() => {
      console.log(messages);
    }, 1000);
  };

  const handleSubmit = () => {
    //  event.preventDefault();

    sendMessage(messageInput);
    setMessageInput("");
  };
  return (
    <>
    <Container>
    <Row>
      <Col></Col>
      <Col>
        <Card style={{ maxWidth: "600" }} className="mb-3">
          <Card.Header>Robobob</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              {messages.map((element, index) => (
               <Messenger key={index} item={element}/>
              ))}
            </Card.Text>
            <Card.Footer>
              <Form>
                <Row>
                  <Col className="col-9">
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

                  <Col className="col-3">
                    <Button variant="primary" onClick={handleSubmit}>
                      Send
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
      <Col></Col>
    </Row>
  </Container>
  </>
  );
}

export default App;
