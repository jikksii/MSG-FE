// import node module libraries
import useHttp from 'hooks/useHttp';
import { useCallback, useState } from 'react';
import { Col, Row, Form, Card, Button, Alert } from 'react-bootstrap';

const PasswordSetting = () => {

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success,setSuccess] = useState(false);


  const handleSuccessAuth = useCallback(data => {
    setCurrentPassword("");
    setPassword("");
    setPasswordConfirmation("");
    setSuccess(true);
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


  const { sendRequest: changePassword } = useHttp(handleSuccessAuth, handleError)

  const changePasswordHandler = () => {
    setErrors([]);
    setErrorMessage(null);
    setSuccess(false);


    console.log(currentPassword, password, passwordConfirmation);
    changePassword({
      method: 'PATCH',
      url: "/settings/password",
      data: {
        current_password: currentPassword,
        password: password,
        password_confirmation: passwordConfirmation
      }
    });
  }




  return (
    <Row className="mb-8">
      <Col xl={9} lg={8} md={12} xs={12}>
        {/* card */}
        <Card id="edit">
          {/* card body */}
          <Card.Body>
            <div className="mb-6 mt-6">
              <h4 className="mb-1">Change your password</h4>
            </div>
            <Form>
              {errorMessage && <Alert key="danger" variant="danger">{errorMessage}</Alert>}
              {success && <Alert key="danger" variant="success">Password Updated Successfully</Alert>}
              {/* Current password */}
              <Row className="mb-3">
                <Form.Label className="col-sm-4" htmlFor="currentPassword">Current password</Form.Label>
                <Col md={8} xs={12}>
                  <Form.Control isInvalid={errors?.current_password} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" placeholder="Enter Current password" id="currentPassword" required />
                  <Form.Control.Feedback type="invalid">
                    <ul>
                      {errors?.current_password?.map((error) => {
                        return <li>{error}</li>
                      })}
                    </ul>
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* New password */}
              <Row className="mb-3">
                <Form.Label className="col-sm-4" htmlFor="newPassword">New password</Form.Label>
                <Col md={8} xs={12}>
                  <Form.Control isInvalid={errors?.password} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter New password" id="newPassword" required />
                  <Form.Control.Feedback type="invalid">
                    <ul>
                      {errors?.password?.map((error) => {
                        return <li>{error}</li>
                      })}
                    </ul>
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Confirm new password */}
              <Row className="align-items-center">
                <Form.Label className="col-sm-4" htmlFor="confirmNewpassword">Confirm new password</Form.Label>
                <Col md={8} xs={12}>
                  <Form.Control isInvalid={errors?.password_confirmation} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} name='password_confirmation' type="password" placeholder="Confirm new password" id="confirmNewpassword" required />
                  <Form.Control.Feedback type="invalid">
                    <ul>
                      {errors?.password_confirmation?.map((error) => {
                        <li>{error}</li>
                      })}
                    </ul>

                  </Form.Control.Feedback>
                </Col>
                {/* list */}
                <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                  <h6 className="mb-1">Password requirements:</h6>
                  <p>Ensure that these requirements are met:</p>
                  <ul>
                    <li> Minimum 8 characters long the more, the better</li>
                    <li>At least one lowercase character</li>
                    <li>At least one uppercase character</li>
                    <li>At least one number, symbol, or whitespace character
                    </li>
                  </ul>
                  <Button onClick={changePasswordHandler} variant="primary" type="button">
                    Save Changes
                  </Button>
                </Col>
              </Row>

            </Form>

          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default PasswordSetting