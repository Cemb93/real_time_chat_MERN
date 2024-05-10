import { useContext } from "react"
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"

export const Login = () => {
  const { loginInfo, loginUser, updateLoginInfo } = useContext(AuthContext)
  return (
    <>
      <Form onSubmit={loginUser}>
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
              <Button variant="primary" type="submit">
                Login
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
