import { IChats, ISessionUser } from "../interface";

const { VITE_BACKEND_URL } = import.meta.env;
export const BACK_END_URL = VITE_BACKEND_URL;
// export const BACK_END_URL = "http://localhost:3001";
export const CHAT = "chats";
export const MESSAGE = "messages";

export async function postRequest(url: string, post: ISessionUser) {
  // console.log("post:", JSON.parse(JSON.stringify(post)))
  // console.log("post - 2:", post)
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log("data:", data)
    
      return data;
    }
  
  } catch (error) {
    console.log('Error en postRequest por:', error)
  }
}

export async function postChatRequest(url: string, post: IChats) {
  console.log("post:", JSON.parse(JSON.stringify(post)))
  console.log("post - 2:", post)
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data:", data)
    
      return data;
    }
  
  } catch (error) {
    console.log('Error en postChatRequest por:', error)
  }
}

export async function getRequest(url: string) {
  // console.log("url:", url)
  try {
    const response = await fetch(url);
  
    if (response.ok) {
      const data = await response.json();
      // console.log("data:", data)
      return data;
    }
  } catch (error) {
    console.log('Error en getRequest por:', error)
  }
}