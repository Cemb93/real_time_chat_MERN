import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

export const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  // console.log("user:", user)
  return (
    <Navbar 
      bg="dark" 
      className="mb-4" 
      style={{
        height: "3.75rem"
      }}
    >
      <Container>
        <h2>
          <Link to={"/"} className='link light test-decoration-none'>
            CHAT APP
          </Link>
        </h2>
        {
          user.id && <span>Usuario {user.name}</span>
        }
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {
              user.name && (
                <div>
                  <Link 
                    onClick={function() {
                      logoutUser()
                    }} 
                    to={"/"} 
                    className="link light test-decoration-none" 
                  >
                    Log Out
                  </Link>
                </div>
              )
            }

            {
              !user.name && (
                <div>
                  <Link to={"/login"} className='link light test-decoration-none'>
                    LOGIN
                  </Link>
                  <br />
                  <Link to={"/register"} className='link light test-decoration-none'>
                    REGISTER
                  </Link>
                </div>
              )
            }
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  )
}
