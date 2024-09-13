import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function Test() {
  const handleSetCookie = async () => {

    try {
      const response = await axios.post(`${import.meta.env.VITE_server_url}/set-cookies`, {}, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error setting cookies:', error);
    }
  };

  const handleGetCookie = async () => {
    try {
          const response = await axios.post(`${import.meta.env.VITE_server_url}/get-cookies`, {}, {
            withCredentials: true, // Ensure cookies are sent with the request
          });
      console.log('Cookies:', response.data.message);
    } catch (error) {
      console.error('Error getting cookies:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleSetCookie}>Set Cookie</Button>
      <Button onClick={handleGetCookie} className="ml-2">Get Cookie</Button>
    </div>
  );
}
