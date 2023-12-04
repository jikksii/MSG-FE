// import node module libraries
import useHttp from 'hooks/useHttp';
import { useCallback, useEffect, useState } from 'react';
import { Col, Row, Form, Card, Button, Image } from 'react-bootstrap';

// import widget as custom components
import { FormSelect, DropFiles } from 'widgets';


const GeneralSetting = () => {

  const [profile, setProfile] = useState({
    username: "",
    company: {
      name: "",
      address:"",
      identification_number:""
    },
    contact:{
      first_name:"",
      last_name:"",
      phone:"",
      email:""
    }
  })


  const handleSuccessAuth = useCallback(data => {
    setProfile(data.data)
  }, []);

  const handleError = (error) => useCallback(
    (error) => {

    },
    []
  )


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
                    <input readOnly value={profile.username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="username" required />
                  </div>
                </Row>
                <div className="mb-6">
                  <h4 className="mb-1">Company</h4>
                </div>
                <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="phone">Name <span className="text-muted"></span></Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control readOnly value={profile.company.name} type="text" />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="phone">Identification<span className="text-muted"></span></Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control readOnly value={profile.company.identification_number} type="text" />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="phone">Address <span className="text-muted"></span></Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control readOnly value={profile.company.address} type="text" />
                    </Col>
                </Row>


                {
                  
                  profile.contact &&
                  
                  <div>
                    <div className="mb-6">
                      <h4 className="mb-1">Contact</h4>
                    </div>
                    <Row className="mb-3">
                      <label htmlFor="email" className="col-sm-4 col-form-label
                        form-label">First Name</label>
                      <div className="col-md-8 col-12">
                        <input readOnly value={profile.contact.first_name}  type="text" className="form-control" required />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="phone">Last Name <span className="text-muted"></span></Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control readOnly value={profile.contact.last_name} type="text" />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="phone">Phone Number<span className="text-muted"></span></Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control readOnly value={profile.contact.phone} type="text"/>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="phone">Email<span className="text-muted"></span></Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control readOnly value={profile.contact.email} type="text"/>
                      </Col>
                    </Row>
                  </div>
                }
                
              </Form>
            </div>
          </Card.Body>
        </Card>

      </Col>
    </Row>
  )
}

export default GeneralSetting