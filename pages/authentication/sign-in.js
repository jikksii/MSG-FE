// import node module libraries
import { Row, Col, Card, Form, Button, Image, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { cookies } from 'next/headers'

// import authlayout to override default layout 
import AuthLayout from 'layouts/AuthLayout';
import { useCallback, useRef, useState } from 'react';
import useHttp from 'hooks/useHttp';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const SignIn = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const router = useRouter()
  const handleSuccessAuth = useCallback(data => {
    setCookie('token', data.data.token);
    router.push('/');
  }, []);

  const handleError = (error) => {
    console.log(error);
    if (error.response?.status === 404) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
      return;
    }

    if (error.response?.status === 422) {
      console.log(error.response.data.errors);
      setErrors(error.response.data.errors)
      return;
    }
  }


  const { sendRequest: login } = useHttp(handleSuccessAuth, handleError)

  const loginHandler = () => {
    setErrors([]);
    setErrorMessage(null);
    login({
      method: 'POST',
      url: "/login",
      data: {
        username: username,
        password: password
      }
    });
  }
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/"><Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" /></Link>
              {errorMessage && <Alert key="danger" variant="danger">{errorMessage}</Alert>}
            </div>
            {/* Form */}
            <Form>
              {/* Username */}
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control isInvalid={errors?.username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Enter address here" required="" />
                <Form.Control.Feedback type="invalid">
                  {errors?.username}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control isInvalid={errors?.password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="**************" required="" />
                <Form.Control.Feedback type="invalid">
                  {errors?.password}
                </Form.Control.Feedback>
              </Form.Group>
              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button onClick={loginHandler} variant="primary" type="button">Sign In</Button>
                </div>
                {/* <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-up" className="fs-5">Create An Account </Link>
                  </div>
                  <div>
                    <Link href="/authentication/forget-password" className="text-inherit fs-5">Forgot your password?</Link>
                  </div>
                </div> */}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

SignIn.Layout = AuthLayout;

export default SignIn