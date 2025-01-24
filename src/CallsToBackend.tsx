import axios from "axios";

export async function registerUser(username: string, password: string) {
    try {
        const response = await axios.post('http://localhost:5000/register', {
            username,
            password,
          });
          return response.data;
    } catch (error: any) {
        if (error.response) {
          throw error.response.data.message;
        } else {
          throw 'An error occurred. Please try again later.';
        }
      }
}

export async function getAllUsers() {
    try {
        const response = await axios.get('http://localhost:5000/getallusers')
        return response.data;
    } catch (error: any) {
        // If the backend returns an error (like username already taken), throw it
        if (error.response) {
          throw error.response.data.message;  // Error from the backend (e.g. Username already taken)
        } else {
          // Generic error message in case of no response (e.g. network issues)
          throw 'An error occurred. Please try again later.';
        }
      }
}