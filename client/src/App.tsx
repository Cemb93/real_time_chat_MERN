import { Navigate, Route, Routes } from "react-router-dom"
import { Chat } from "./pages/Chat"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";
// import { ChatContextProvider } from "./context/ChatContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NavBar } from "./components/NavBar";

function App() {
  // const { user } = useContext(AuthContext);

  return (
    // <ChatContextProvider user={user}>
    <>
      <NavBar/>
      <Container className="text-secondary">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App
