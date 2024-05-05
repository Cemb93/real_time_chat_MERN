import { Navigate, Route, Routes } from "react-router-dom"
import { Chat } from "./pages/Chat"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <ChatContextProvider user={user}>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    // </ChatContextProvider>
  );
}

export default App
