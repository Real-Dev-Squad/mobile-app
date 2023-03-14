import { API_ENDPOINT } from '@env';
import axios from 'axios';

export default async function login(code: string) {
  try {
    const response = await axios.get(`${API_ENDPOINT}/login?code=${code}`);
    return response;
  } catch (err) {
    console.log(err);
  }
}
