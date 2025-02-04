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

export async function loginUser(username: string, password: string) {
  try {
    const response = await axios.post('http://localhost:5000/login', {
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

export async function getCurrentUserInfo(username: string, jwt: string) {
  try {
      const response = await axios.get('http://localhost:5000/my-data', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          username,
        }
      })
      return response.data;
  } catch (error: any) {
      if (error.response) {
        throw error.response.data.message;
      } else {
        throw 'An error occurred. Please try again later.';
      }
    }
}

export async function getGeneratedImage(selectionName: string, typeOfContent:string) {
  try {
    const response = await axios.post('http://localhost:5000/generate-image', {
      selectionName,
      typeOfContent,
    });
      return response.data;
  } catch (error) {
      console.error("Error fetching image:", error);
      return { error: "Failed to generate image" };
  }
}

export async function uploadImageToBB(imageUrl: string, jwt: string) {
  try {
    const response = await axios.post(
      'http://localhost:5000/upload',
      {imageUrl} ,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding image:", error);
    return { error: "Failed to add image" };
  }
}

export async function addImageUrl(url: string, jwt: string) {
  try {
    const response = await axios.post(
      'http://localhost:5000/add-url',
      { url },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding image:", error);
    return { error: "Failed to add image" };
  }
}

export async function removeImageUrl(url: string, jwt: string) {
  try {
    const response = await axios.post(
      'http://localhost:5000/remove-url',
      { url },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing image:", error);
    return { error: "Failed to remove image" };
  }
}