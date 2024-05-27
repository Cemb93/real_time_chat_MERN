import { useContext, useEffect } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"
const { VITE_BACKEND_URL } = import.meta.env;

export const Login = () => {
  const { loginInfo, loginUser, updateLoginInfo, getUserWithGoogle } = useContext(AuthContext)
  function loginWithGoogle() {
    const session = window.open(
      `${VITE_BACKEND_URL}/auth/google/callback`,
      "_self"
    );
    localStorage.setItem("sessionWithGoogle", JSON.stringify(session))
    console.log("loginWithGoogle", JSON.stringify(session))
    // getUserWithGoogle()
    // window.open(
    //   `${VITE_BACKEND_URL}/auth/google`,
    //   "_self"
    // );
  }

  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const response = await fetch('http://localhost:6005/login', {
    //       credentials: "include", // Esto permite que las cookies de sesión se envíen con la solicitud
    //     });

    //     const session = await response.json();
    //     localStorage.setItem("sessionWithGoogle", JSON.stringify(session.user))
    //     // setUser(response.data.user);
    //   } catch (error) {
    //     console.error('Error fetching user:', error);
    //   }
    // };

    // fetchUser();
  }, []);
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
              <Button type="button" onClick={loginWithGoogle}>
                Login with google
              </Button>
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