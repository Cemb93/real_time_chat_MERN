import { useContext } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"
const { VITE_BACKEND_URL } = import.meta.env;

export const Login = () => {
  const { loginInfo, loginUser, updateLoginInfo } = useContext(AuthContext)
  function loginWithGoogle() {
    // window.location.href = 'http://localhost:6005/auth/google';
    // window.location.href = `${VITE_BACKEND_URL}/auth/google`;
    window.open(
      `${VITE_BACKEND_URL}/auth/google/callback`,
      "_self"
    );
    // window.open(
    //   `${VITE_BACKEND_URL}/auth/google`,
    //   "_self"
    // );
  }
  return (
    <>
      {/* <Form onSubmit={loginUser}> */}
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
              {/* <Button variant="primary" type="submit" onClick={loginUser}> */}
                Login
              </Button>
              <button type="button" onClick={loginWithGoogle}>
                Login with google
              </button>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  )
}


// export const Login = () => {

//   const loginwithgoogle = ()=>{
//       // window.open("http://localhost:6005/auth/google/callback","_self")
//       // window.open("http://localhost:6005/auth/google","_self")
//       window.location.href = `${VITE_BACKEND_URL}/auth/google`;
//   }
// return (
//   <>
//       <div className="login-page">
//           <h1 style={{textAlign:"center"}}>Login</h1>
//           <div className="form">
//               <form className='login-form'>
//                   <input type="text" placeholder='username' />
//                   <input type="password" placeholder='password'  />
//                   <button>Login</button>
//                   <p className='message'>Not Registerd? <a href="#">Create an account</a></p>
//               </form>
//               <button className='login-with-google-btn' onClick={loginwithgoogle}>
//                   Sign In With Google
//               </button>
//           </div>
//       </div>
//   </>
// )
// }