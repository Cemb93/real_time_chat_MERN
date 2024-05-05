const { VITE_BACKEND_URL } = import.meta.env;
export const BACK_END_URL = VITE_BACKEND_URL;
// export const BACK_END_URL = "http://localhost:3001";
export const CHAT = "chat";
export const MESSAGE = "message";

export async function postRequest(url: string, body: any) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = response.json();

  return data;
}

export async function getRequest(url: string) {
  const response = await fetch(url);

  const data = response.json();

  return data;
}