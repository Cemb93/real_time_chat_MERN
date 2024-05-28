import { ISessionUser } from "../interface";

export const getUserId = (): string | null => {
  const userJson = localStorage.getItem('loginWithGoogle');
  if (userJson) {
    try {
      const user: ISessionUser = JSON.parse(userJson);
      return user._id;
    } catch (error) {
      console.error("Error parsing JSON name:", error);
      return null;
    }
  }
  return null;
};

export const getUserIdGoogle = (): string | null => {
  const userJson = localStorage.getItem('loginWithGoogle');
  if (userJson) {
    try {
      const user: ISessionUser = JSON.parse(userJson);
      if (user.googleId) {
        return user.googleId;
      }
    } catch (error) {
      console.error("Error parsing JSON name:", error);
      return null;
    }
  }
  return null;
};

export const getUserName = (): string | null => {
  const userJson = localStorage.getItem('loginWithGoogle');
  if (userJson) {
    try {
      const user: ISessionUser = JSON.parse(userJson);
      // console.log("getUserName:", user)
      return user.name;
    } catch (error) {
      console.error("Error parsing JSON name:", error);
      return null;
    }
  }
  return null;
};