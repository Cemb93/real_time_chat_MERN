import { useContext } from "react"
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"
const { VITE_BACKEND_URL } = import.meta.env;

export const Register = () => {
  const { registerInfo, updateRegisterInfo, registerUser } = useContext(AuthContext);
  function googleAuth() {
    window.open(
      `${VITE_BACKEND_URL}/auth/google/callback`,
      "_self"
    );
  }

  return (
    <>
      <Form onSubmit={registerUser}>
        <Row style={{
          height: "100vh",
          justifyContent: "center",
          paddingRight: "10%",
        }}>
          <Col xs={6}>
            <Stack gap={3}>
              <h2>REGISTER</h2>
              <Form.Control type="text" placeholder="Name" onChange={function (e) {
                updateRegisterInfo({ ...registerInfo, name: e.target.value });
              }} />
              <Form.Control type="email" placeholder="Email" onChange={function (e) {
                updateRegisterInfo({ ...registerInfo, email: e.target.value });
              }} />
              <Form.Control type="password" placeholder="Password" onChange={function (e) {
                updateRegisterInfo({ ...registerInfo, password: e.target.value });
              }} />
              <Button variant="primary" type="submit">
                Register
              </Button>
              <Button variant="primary" type="submit" onClick={googleAuth}>
                Register with google
              </Button>
              <Alert variant="danger">
                <p>Error</p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  )
}
