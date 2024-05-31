import { useContext } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"
const { VITE_BACKEND_URL } = import.meta.env;

export const Login = () => {
  const { loginInfo, loginUser, updateLoginInfo } = useContext(AuthContext)
  function loginWithGoogle() {
    window.open(
      `${VITE_BACKEND_URL}/auth/google/callback`,
      "_self"
    );
  }
  return (
    <>
      <Form>
        <Row style={{
          height: "100vh",
          justifyContent: "center",
          paddingRight: "10%",
        }}>
          <Col xs={6}>
            <Stack gap={3}>
              <h2>LOGIN</h2>
              <Form.Control type="email" placeholder="Email" onChange={function (e) {
                updateLoginInfo({ ...loginInfo, email: e.target.value });
              }} />
              <Form.Control type="password" placeholder="Password" onChange={function (e) {
                updateLoginInfo({ ...loginInfo, password: e.target.value });
              }} />
              <Button variant="primary" type="submit" onClick={(e) => loginUser(e)}>
                Login
              </Button>
              <Button type="button" onClick={() => loginWithGoogle()}>
                Login with google
              </Button>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
}
