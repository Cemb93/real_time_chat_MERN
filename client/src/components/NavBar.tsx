import { Container, Nav, Navbar, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"

export const NavBar = () => {
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
        <Nav>
          <Stack direction="horizontal" gap={3}>
            <Link to={"/login"} className='link light test-decoration-none'>
              LOGIN
            </Link>
            <Link to={"/register"} className='link light test-decoration-none'>
              REGISTER
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  )
}
