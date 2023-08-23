import axios from "axios";


export const fetchDataTest = async () => {
    try {
      return await axios.get('MessengerAPI.json');
    } catch (e) {
      return [];
    }
  };