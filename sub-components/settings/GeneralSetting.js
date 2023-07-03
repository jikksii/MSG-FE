// import node module libraries
import useHttp from 'hooks/useHttp';
import { useCallback, useEffect, useState } from 'react';
import { Col, Row, Form, Card, Button, Image } from 'react-bootstrap';

// import widget as custom components
import { FormSelect, DropFiles } from 'widgets';


const GeneralSetting = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  const handleSuccessAuth = useCallback(data => {
    setFirstName(data.data.first_name);
    setLastName(data.data.last_name);
    setEmail(data.data.email);
    setPhone(data.data.phone);
    setUsername(data.data.username)
  }, []);

  const handleError = (error) => {
    console.log(error);
  }


  const { sendRequest: fetchProfile } = useHttp(handleSuccessAuth, handleError)

  const fetchProfileApi = () => {
    fetchProfile({
      url: "/settings/profile",
    });
  }

  useEffect(() => {
    fetchProfileApi();
  }, [])

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">General Setting</h4>
          <p className="mb-0 fs-5 text-muted">Profile configuration settings </p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
            <div className=" mb-6">
              <h4 className="mb-1">General Settings</h4>
            </div>
            {/* col */}
            <div>
              {/* border */}
              <div className="mb-6">
                <h4 className="mb-1">Basic information</h4>
              </div>
              <Form>
                <Row className="mb-3">
                  <label htmlFor="username" className="col-sm-4 col-form-label
                    form-label">Username</label>
                  <div className="col-md-8 col-12">
                    <input readOnly value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" placeholder="Username" id="username" required />
                  </div>
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <label htmlFor="fullName" className="col-sm-4 col-form-label
                    form-label">Full name</label>
                  <div className="col-sm-4 mb-3 mb-lg-0">
                    <input readOnly value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" placeholder="First name" id="fullName" required />
                  </div>
                  <div className="col-sm-4">
                    <input readOnly value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" placeholder="Last name" id="lastName" required />
                  </div>
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <label htmlFor="email" className="col-sm-4 col-form-label
                    form-label">Email</label>
                  <div className="col-md-8 col-12">
                    <input readOnly value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email" id="email" required />
                  </div>
                </Row>
                {/* row */}
                <Row className="mb-3">
                  <Form.Label className="col-sm-4" htmlFor="phone">Phone <span className="text-muted">(Optional)</span></Form.Label>
                  <Col md={8} xs={12}>
                    <Form.Control readOnly value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Enter Phone" id="phone" />
                  </Col>
                </Row>
              </Form>
            </div>
          </Card.Body>
        </Card>

      </Col>
    </Row>
  )
}

export default GeneralSetting