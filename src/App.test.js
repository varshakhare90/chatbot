import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import fetchDataTest from './Utils/ApiCall';
//import MockAdapter from 'axios-mock-adapter';

jest.mock('axios');


test('renders Questions History', () => {
  render(<App />);
  const linkElement = screen.getByText('Questions History');
  expect(linkElement).toBeInTheDocument();
});

test('renders the name of the chatbot' , () =>{
  render(<App />);

  const eleText = screen.getByText('Robobob ChatBot');
  expect(eleText).toBeInTheDocument();
});


// describe('fetchData', () => {
//   it('fetches successfully data from an API', async () => {

//     const data = {
//       "questions": [
//         { "question": "What is your name", "answer": "RoboBob" },
//         { "question": "2+2", "answer": "4" },
//         { "question": "2*10.5+1", "answer": "22" },
//         { "question": "5*5", "answer": "25" },
//         { "question": "10/10", "answer": "1" },
//         { "question": "Who made you?", "answer": "Varsha" }
//       ]
//     };    

//     axios.get.mockResolvedValueOnce(data);
//     const result = await fetchDataTest();

//     expect(axios.get).toHaveBeenCalledWith('MessengerAPI.json');
//       expect(result).toEqual(data);

//   });


//});
