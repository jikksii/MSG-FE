import useHttp from "hooks/useHttp";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import Creatable from 'react-select/creatable';


const BatchMessageForm = ({isRoutine = false,routine = null}) => {
    const companyRef = useRef();
    const contactBookSelectRef = useRef();
    const manualPhoneNumberCreatableRef = useRef();
    const exceptionNumbersRef = useRef();


    const router = useRouter();

    // Call this function when you want to refresh the data
    const refreshData = () => router.reload();



    const routineDate = useRef();
    const routineStartDate = useRef();
    const routineEndDate = useRef();
    const routineTime = useRef();
    const routineNameRef = useRef();

    const mondayRef = useRef();
    const tuesdayRef = useRef();
    const wednesdayRef = useRef();
    const thursdayRef = useRef();
    const fridayRef = useRef();
    const saturdayRef = useRef();
    const sundayRef = useRef();


    const dayOfMonthRef = useRef();





    const [selectedPeriodity,setSelectedPeriodity] = useState({
        value : 1,
        label : "One time"
    })


    const [showModal,setShowModal] = useState(false);

    const [routineTypes,setRoutineTypes]  = useState([]);

    const {isLoading : f, sendRequest : fetchRoutineTypes} = useHttp((data) => {
        setRoutineTypes(data)
    },
        () => {}
    )

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
        fetchRoutineTypes({
            method : 'GET',
            url: '/routines/types'
        })
    },[])



    const [errors,setErrors] = useState({})
    //filtered 
    const handleCreate = (data) => {
        refreshData();
        setShowModal(true)
    }

    const handleCreateError = (error) =>{
        console.log(error);
        if (error.response.status === 422){
            setErrors(error.response.data.errors)
        }
    }
    const { isLoading: isCreating , sendRequest: createRoutine } = useHttp(handleCreate, handleCreateError)



    const [isFiltered,setIsFilterd] = useState(true)
    const handleSubmit = () => {
        let data = {}
        data.routine_type_id =  selectedPeriodity.value;
        data.name  = routineNameRef.current.value
        if(selectedPeriodity.value == 1){
            data.date = routineDate.current.value
        }else{
            data.start_date =  routineStartDate.current.value
            data.end_date =  routineEndDate.current.value
        }
        data.next_execution_time =  routineTime.current.value
        if(selectedPeriodity.value == 3){
            data.send_on_monday = mondayRef.current.checked
            data.send_on_tuesday  = tuesdayRef.current.checked
            data.send_on_wednesday  = wednesdayRef.current.checked
            data.send_on_thursday  = thursdayRef.current.checked
            data.send_on_friday = fridayRef.current.checked
            data.send_on_saturday = saturdayRef.current.checked
            data.send_on_sunday  = sundayRef.current.checked
        }
        if(selectedPeriodity.value == 4){
            data.day_of_month = dayOfMonthRef.current.value
        }
        let lists = contactBookSelectRef.current.state.selectValue;

        data.list_ids = lists.map((e) => e.value);
        let manualPhoneNumbers = manualPhoneNumberCreatableRef.current.state.selectValue;
        data.includePhoneNumbers = manualPhoneNumbers.map((e) => e.value);

        let exceptionPhoneNumbers = exceptionNumbersRef.current.state.selectValue;
        data.excludePhoneNumbers = exceptionPhoneNumbers.map((e) => e.value);

        data.is_filtered = isFiltered;
        data.message = text

        createRoutine({
            method : 'POST',
            url:"/routines",
            data : data
        });
    }

    return (
        <Form>
            {
                <div className="border-bottom pb-10">
                    <Row className="mb-3 ">
                        <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>Periody</Form.Label>
                            <Select options={routineTypes.map((e) => {
                                return {
                                    value : e.id,
                                    label : e.name
                                }
                            }) } value={selectedPeriodity} onChange={(value) => setSelectedPeriodity(value)} placeholder="Select Periodical"/>
                            <Form.Control.Feedback type="invalid">
                                {/* <ul>
                                {errors?.phone_number?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul> */}
                            </Form.Control.Feedback>
                        </Col>
                        {selectedPeriodity?.value === 1 && <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>Date</Form.Label>

                            <Form.Control
                                isInvalid={errors?.date}
                                type="date"
                                ref={routineDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                <ul>
                                {errors?.date?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul>
                            </Form.Control.Feedback>
                        </Col>}
                        {selectedPeriodity?.value !== 1 && <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>Start date</Form.Label>

                            <Form.Control
                                type="date"
                                isInvalid={errors?.start_date}
                                ref={routineStartDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                <ul>
                                {errors?.start_date?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul>
                            </Form.Control.Feedback>
                        </Col>}
                        {selectedPeriodity?.value !== 1 && <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>End date</Form.Label>

                            <Form.Control
                                isInvalid={errors?.end_date}
                                type="date"
                                ref={routineEndDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                <ul>
                                {errors?.end_date?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul>
                            </Form.Control.Feedback>
                        </Col>}
                        <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                isInvalid={errors?.next_execution_time}
                                type="time"
                                ref={routineTime}
                            />
                            <Form.Control.Feedback type="invalid">
                                <ul>
                                {errors?.next_execution_time?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul>
                            </Form.Control.Feedback>
                        </Col>
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
                        <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>Day of Month</Form.Label>

                            <Form.Control
                                type="number"
                                min={1}
                                max={31}
                                step={1}
                                onKeyDown={() => {return false}}
                                ref={dayOfMonthRef}
                                isInvalid={errors?.day_of_month}
                            />
                            <Form.Control.Feedback type="invalid">
                                <ul>
                                {errors?.day_of_month?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul>
                            </Form.Control.Feedback>
                        </Col>
                    </Row>}
                </div>
            }
            <Row className="mb-3 my-10">
                <Col xl={6} lg={6} md={6} xs={12}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        isInvalid={errors?.description}
                        ref={routineNameRef}
                    />
                    <Form.Control.Feedback type="invalid">
                        <ul>
                        {errors?.description?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul>
                    </Form.Control.Feedback>
                </Col>
            </Row>
            
            <Row className="mb-3 my-10">
                <h3>Phone numbers</h3>
                <Col xl={6} lg={6} md={6} xs={12}>
                    <Form.Label>Phone numbers of address book lists</Form.Label>
                    <Select options={addressBookLists.map((element) => {
                        return {
                            value: element.id,
                            label: element.name
                        }
                    })}
                    
                        ref={contactBookSelectRef} placeholder="Select contact book lists" isMulti={true} />

                    <Form.Control
                        hidden={true}
                        isInvalid={errors?.list_ids}
                    /> 
                    <Form.Control.Feedback type="invalid">
                        <ul>
                        {errors?.list_ids?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul>
                    </Form.Control.Feedback>
                </Col>
                <Col xl={6} lg={6} md={6} xs={12}>
                    <Form.Label>Include phone numbers</Form.Label>
                    <Creatable ref={manualPhoneNumberCreatableRef} placeholder="Enter phone number"  isMulti={true} />
                    <Form.Control
                        hidden={true}
                        isInvalid={errors?.includePhoneNumbers}
                    /> 
                    <Form.Control.Feedback type="invalid">
                        <ul>
                        {errors?.includePhoneNumbers?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul>
                    </Form.Control.Feedback>
                </Col>
            </Row>

            <Row className="mb-3 my-10">
                <h3>Exclude</h3>
                <Col xl={6} lg={6} md={6} xs={12}>
                    <Form.Label>Ignore phone numbers</Form.Label>
                    <Creatable ref={exceptionNumbersRef} placeholder="Enter phone number"  isMulti={true} />
                    <Form.Control
                        hidden={true}
                        isInvalid={errors?.includePhoneNumbers}
                    /> 
                    <Form.Control.Feedback type="invalid">
                        <ul>
                        {errors?.includePhoneNumbers?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul>
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
                <Button onClick={handleSubmit}>Create</Button>
            </Row>
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false)
                }}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Created successfully
					</Modal.Title>
				</Modal.Header>
			</Modal>
        </Form>
    )
}
export default BatchMessageForm;