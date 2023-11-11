import useHttp from "hooks/useHttp";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import Creatable from 'react-select/creatable';


const BatchMessageForm = ({isRoutine = false,routine = null}) => {
    const companyRef = useRef();
    const contactBookSelectRef = useRef();
    const manualPhoneNumberCreatableRef = useRef();
    const exceptionNumbersRef = useRef();





    const routineStartDate = useRef();
    const routineEndDate = useRef();
    const routineTime = useRef();

    const mondayRef = useRef();
    const tuesdayRef = useRef();
    const wednesdayRef = useRef();
    const thursdayRef = useRef();
    const fridayRef = useRef();
    const saturdayRef = useRef();
    const sundayRef = useRef();


    const dayOfMonthRef = useRef();





    const [asRoutine,setAsRoutine] = useState(false);
    const [selectedPeriodity,setSelectedPeriodity] = useState({
        value : 1,
        label : "One time"
    })
    const periodities = [
        {
            value : 1,
            label : "One time"
        },
        {
            value : 2,
            label : "Daily"
        },
        {
            value : 3,
            label : "Weekly"
        },
        {
            value : 4,
            label : "Monthly"
        }
    ];


    const [text,setText] = useState("");

    // fetch contact lists.

    const [addressBookLists,setAddressBookLists] = useState([])
    const handleSuccessListFetch = (data) => {
        setAddressBookLists(data.data);
    }

    const handleError = () =>{

    }
    const { isLoading: isFetchingLists , sendRequest: fetchLists } = useHttp(handleSuccessListFetch, handleError)
    

    useEffect(() => {
        fetchLists({
            method: 'GET',
            url: "/addressBook/lists"
        })
    },[])


    //filtered 

    const [isFiltered,setIsFilterd] = useState(true)
    const handleSubmit = () => {
        let data = {}
        if(asRoutine){
            data.periodity_id =  selectedPeriodity.value;
            data.start_date =  routineStartDate.current.value
            data.end_date =  routineEndDate.current.value
            data.time =  routineTime.current.value
            if(selectedPeriodity.value == 3){
                data.weekdays = {}
                data.weekdays.monday = mondayRef.current.checked
                data.weekdays.tuesday = tuesdayRef.current.checked
                data.weekdays.wednesday = wednesdayRef.current.checked
                data.weekdays.thursday = thursdayRef.current.checked
                data.weekdays.firday = fridayRef.current.checked
                data.weekdays.saturday = saturdayRef.current.checked
                data.weekdays.sunday = sundayRef.current.checked
            }
            if(selectedPeriodity.value == 4){
                data.day_of_month = dayOfMonthRef.current.value
            }
        }
        let lists = contactBookSelectRef.current.state.selectValue;

        data.list_ids = lists.map((e) => e.value);
        let manualPhoneNumbers = manualPhoneNumberCreatableRef.current.state.selectValue;
        data.phone_numbers = manualPhoneNumbers.map((e) => e.value);

        let exceptionPhoneNumbers = exceptionNumbersRef.current.state.selectValue;
        data.exception_phone_numbers = exceptionPhoneNumbers.map((e) => e.value);

        data.is_filtered = isFiltered;
        data.text = text

        console.log(data);
    }

    return (
        <Form>
            {
                !isRoutine && 
                <Row className="mb-3">
                    <Col xl={6} lg={6} md={6} xs={12}>
                        <Form.Check
                            type="switch"
                            label="Save as Routine"
                            name="isRoutine"
                            value={asRoutine}
                            onChange={() => setAsRoutine(prevValue => !prevValue)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {/* <ul>
                            {errors?.phone_number?.map((error,index) => {
                                return <li key={index}>{error}</li>
                            })}
                            </ul> */}
                        </Form.Control.Feedback>
                    </Col>
                </Row>
            }
            {
                !isRoutine && asRoutine && 
                <div className="border-bottom pb-10">
                    <Row className="mb-3 ">
                        <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>Periody</Form.Label>
                            <Select options={periodities } value={selectedPeriodity} onChange={(value) => setSelectedPeriodity(value)} placeholder="Select Periodical"/>
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                        <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>Start date</Form.Label>

                            <Form.Control
                                type="date"
                                ref={routineStartDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                        <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>End date</Form.Label>

                            <Form.Control
                                type="date"
                                ref={routineEndDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                        {selectedPeriodity?.value !== 1 &&  <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="time"
                                ref={routineTime}
                            />
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>}
                    </Row>
                    {selectedPeriodity?.value === 3 && <Row>
                        <Col xl={1} lg={6} md={6} xs={12}>
                            <Form.Check
                                type="checkbox"
                                label="Monday"
                                name="monday"
                                ref={mondayRef}
                            />
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                        <Col xl={1} lg={6} md={6} xs={12}>
                            <Form.Check
                                type="checkbox"
                                label="Tuesday"
                                name="tuesday"
                                ref={tuesdayRef}
                            />
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                        <Col xl={1}lg={6} md={6} xs={12}>
                            <Form.Check
                                type="checkbox"
                                label="Wednesday"
                                name="wednesday"
                                ref={wednesdayRef}
                            />
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                        <Col xl={1} lg={6} md={6} xs={12}>
                            <Form.Check
                                type="checkbox"
                                label="Thursday"
                                name="thursday"
                                ref={thursdayRef}
                            />
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                        <Col xl={1} lg={6} md={6} xs={12}>
                            <Form.Check
                                type="checkbox"
                                label="Friday"
                                name="friday"
                                ref={fridayRef}
                            />
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                        <Col xl={1} lg={6} md={6} xs={12}>
                            <Form.Check
                                type="checkbox"
                                label="Saturday"
                                name="saturday"
                                ref={saturdayRef}
                            />
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                        <Col xl={1} lg={6} md={6} xs={12}>
                            <Form.Check
                                type="checkbox"
                                label="Sunday"
                                name="sunday"
                                ref={sundayRef}
                            />
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>}

                    {selectedPeriodity?.value === 4 && <Row>
                        <Col xl={1} lg={6} md={6} xs={12}>
                            <Form.Label>Day of Month</Form.Label>

                            <Form.Control
                                type="number"
                                min={1}
                                max={31}
                                step={1}
                                onkeydown="return false"
                                ref={dayOfMonthRef}
                            />
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>}
                </div>
            }
            
            <Row className="mb-3">
                <Col xl={6} lg={6} md={6} xs={12}>
                    <Form.Label>Sender</Form.Label>
                    <Select ref={companyRef} placeholder="Select company"/>
                    <Form.Control.Feedback type="invalid">
                        {/* <ul>
                        {errors?.phone_number?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul> */}
                    </Form.Control.Feedback>
                </Col>
            </Row>
            <Row className="mb-3 my-10">
                <h3>Phone numbers</h3>
                <Col xl={6} lg={6} md={6} xs={12}>
                    <Form.Label>Contact book list</Form.Label>
                    <Select options={addressBookLists.map((element) => {
                        return {
                            value: element.id,
                            label: element.name
                        }
                    })} 
                        ref={contactBookSelectRef} placeholder="Select contact book lists" isMulti={true} />
                    <Form.Control.Feedback type="invalid">
                        {/* <ul>
                        {errors?.phone_number?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul> */}
                    </Form.Control.Feedback>
                </Col>
                <Col xl={6} lg={6} md={6} xs={12}>
                    <Form.Label>Manual Select</Form.Label>
                    <Creatable ref={manualPhoneNumberCreatableRef} placeholder="Enter phone number"  isMulti={true} />
                    <Form.Control.Feedback type="invalid">
                        {/* <ul>
                        {errors?.phone_number?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul> */}
                    </Form.Control.Feedback>
                </Col>
            </Row>

            <Row className="mb-3 my-10">
                <h3>Exceptions</h3>
                <Col xl={6} lg={6} md={6} xs={12}>
                    <Form.Label>Manual Select</Form.Label>
                    <Creatable ref={exceptionNumbersRef} placeholder="Enter phone number"  isMulti={true} />
                    <Form.Control.Feedback type="invalid">
                        {/* <ul>
                        {errors?.phone_number?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul> */}
                    </Form.Control.Feedback>
                </Col>
            </Row>
            <Row className="mb-3 my-10">
                <h3>Sending type</h3>
                <Col xl={1} lg={6} md={6} xs={12}>
                    <Form.Check
                        type="radio"
                        label="With Filter"
                        name="isFiltered"
                        checked={isFiltered}
                        onChange={() => setIsFilterd(true)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {/* <ul>
                        {errors?.phone_number?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul> */}
                    </Form.Control.Feedback>
                </Col>
                <Col xl={2} lg={6} md={6} xs={12}>
                    <Form.Check
                        type="radio"
                        label="Without Filter"
                        name="isFiltered"
                        checked={!isFiltered}
                        onChange={() => setIsFilterd(false)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {/* <ul>
                        {errors?.phone_number?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul> */}
                    </Form.Control.Feedback>
                </Col>
            </Row>
            <Row className="mb-3">
                <h3>TEXT</h3>
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Button className="me-1 mb-1" variant="outline-white">First name</Button>
                    <Button className="me-1 mb-1" variant="outline-white">Last name</Button>
                    <Button className="me-1 mb-1" variant="outline-white">Birthday</Button>
                </Col>
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Form.Control value={text} onChange={(e) => setText(e.target.value)} as="textarea" rows={12} />
                    <Form.Control.Feedback type="invalid">
                        {/* <ul>
                        {errors?.phone_number?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul> */}
                    </Form.Control.Feedback>
                </Col>
            </Row>
            <Row>
                <Button onClick={handleSubmit}>Send</Button>
            </Row>
        </Form>
    )
}
export default BatchMessageForm;