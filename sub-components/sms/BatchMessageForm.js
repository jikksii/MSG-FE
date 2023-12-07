import useHttp from "hooks/useHttp";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
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




    useEffect(()=> {
        if(routine){
            console.log(routine);
            setSelectedPeriodity({
                value : routine.type.id,
                label : routine.type.name
            })

            let lists = routine.lists.map((element) => {
                return {
                    value : element.id,
                    label : element.name
                }
            })
            setSelectedLists(lists)
            setSelectedExcludePhoneNumbers(routine.excludePhoneNumbers.map((e) => {
                return {
                    value : e.phone_number,
                    label : e.phone_number
                }
            }));
            setSelectedIncludePhoneNumbers(routine.includePhoneNumbers.map((e) => {
                return {
                    value : e.phone_number,
                    label : e.phone_number
                }
            }));
            setIsFilterd(routine.is_filtered);
            setText(routine.message)
        }
    },[routine])

    const [selectedPeriodity,setSelectedPeriodity] = useState();


    const [showModal,setShowModal] = useState(false);

    const [routineTypes,setRoutineTypes]  = useState([]);


    const handleFetchRoutineTypes  = useCallback(
        (data) => {
            setRoutineTypes(data);
        },
        []
    )

    const handleFetchRoutineTypesError = useCallback(
        () => {},[]
    )
    const {isLoading : f, sendRequest : fetchRoutineTypes} = useHttp(handleFetchRoutineTypes,handleFetchRoutineTypesError)

    const [text,setText] = useState("");

    // fetch contact lists.

    const [addressBookLists,setAddressBookLists] = useState([])
    const handleSuccessListFetch = useCallback(
        (data) => {
            setAddressBookLists(data.data);
        },
        []
    )

    const handleError =  useCallback(
        () => {},
        []
    )
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



    const handleSave = (data) => {
        setShowModal(true)

        setTimeout(() => {
            setShowModal(false)
        },450)
    }

    const { isLoading: isUpdating , sendRequest: updateRoutine } = useHttp(handleSave, handleCreateError)

    const [isFiltered,setIsFilterd] = useState(true)
    const handleSubmit = () => {
        let data = {}
        if(selectedPeriodity){
            data.routine_type_id =  selectedPeriodity.value;
        }
        data.description  = routineNameRef.current.value
        if(selectedPeriodity && selectedPeriodity.value == 1){
            data.date = routineDate.current.value
        }else{
            data.start_date =  routineStartDate.current.value
            data.end_date =  routineEndDate.current.value
        }
        data.next_execution_time =  routineTime.current.value
        if(selectedPeriodity && selectedPeriodity.value == 3){
            data.send_on_monday = mondayRef.current.checked
            data.send_on_tuesday  = tuesdayRef.current.checked
            data.send_on_wednesday  = wednesdayRef.current.checked
            data.send_on_thursday  = thursdayRef.current.checked
            data.send_on_friday = fridayRef.current.checked
            data.send_on_saturday = saturdayRef.current.checked
            data.send_on_sunday  = sundayRef.current.checked
        }
        if(selectedPeriodity && selectedPeriodity.value == 4){
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


        if(routine){
            updateRoutine({
                method : 'PUT',
                url:`/routines/${routine.id}`,
                data : data
            })
        }else{
            createRoutine({
                method : 'POST',
                url:"/routines",
                data : data
            });
        }
    }



    const [selectedLists,setSelectedLists] = useState([]);
    const [selectedIncludePhoneNumbers, setSelectedIncludePhoneNumbers] = useState([]);
    const [selectedExcludePhoneNumbers, setSelectedExcludePhoneNumbers] = useState([]);



    const getIncludePhoneNumbersErrors = () => {
        let keys = Object.keys(errors).filter(key => key.match(/^includePhoneNumbers\.(\d+)$/))
        let errs = keys.map(function(key){
            let err = errors[key];
            console.log(err);
            return err.map((e) => {
                return e;
            })
        })

        return errs.flat();
    }

    const getExcludePhoneNumbersErrors = () => {
        let keys = Object.keys(errors).filter(key => key.match(/^excludePhoneNumbers\.(\d+)$/))

        let errs = keys.map(function(key){
            let err = errors[key];
            console.log(err);
            return err.map((e) => {
                return e;
            })
        })

        return errs.flat();
    }

    const includePhoneNumbersErrors = getIncludePhoneNumbersErrors();
    const excludePhoneNumbersErrors = getExcludePhoneNumbersErrors();
    return (
        <Form>
            {
                <div className="border-bottom pb-10">
                    <Row className="mb-3 ">
                        <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>Periodicity</Form.Label>
                            <Form.Control
                                isInvalid={errors?.routine_type_id}
                                hidden={true}
                            />
                            <Select options={routineTypes.map((e) => {
                                return {
                                    value : e.id,
                                    label : e.name
                                }
                            }) }  value={selectedPeriodity} onChange={(value) => setSelectedPeriodity(value)} placeholder="Select Periodicity"/>
                            <Form.Control.Feedback type="invalid">
                                <ul>
                                {errors?.routine_type_id?.map((error,index) => {
                                    return <li key={index}>{error}</li>
                                })}
                                </ul>
                            </Form.Control.Feedback>
                        </Col>
                        {selectedPeriodity?.value === 1 && <Col xl={3} lg={6} md={6} xs={12}>
                            <Form.Label>Date</Form.Label>

                            <Form.Control
                                isInvalid={errors?.date}
                                type="date"
                                ref={routineDate}
                                defaultValue={routine ? routine.start_date : null}
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
                                defaultValue={routine ? routine.start_date : null}
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
                                defaultValue={routine ? routine.end_date : null}
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
                                defaultValue={routine ? routine.next_execution_time : null}
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
                                defaultChecked={routine ? routine.send_on_monday : false}
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
                                defaultChecked={routine ? routine.send_on_tuesday : false}
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
                                type="checkbox"
                                label="Wednesday"
                                name="wednesday"
                                ref={wednesdayRef}
                                defaultChecked={routine ? routine.send_on_wednesday : false}
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
                                defaultChecked={routine ? routine.send_on_thursday : false}
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
                                defaultChecked={routine ? routine.send_on_friday : false}
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
                                defaultChecked={routine ? routine.send_on_saturday : false}
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
                                defaultChecked={routine ? routine.send_on_sunday : false}
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
                                defaultValue={routine ? routine.day_of_month : ""}
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
                        defaultValue={routine ? routine.description : ""}
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
                    
                        ref={contactBookSelectRef} value={selectedLists} onChange={(value) => setSelectedLists(value)} placeholder="Select contact book lists" isMulti={true} />

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
                    <Creatable ref={manualPhoneNumberCreatableRef} 
                        value={selectedIncludePhoneNumbers} 
                        onChange={(value) => setSelectedIncludePhoneNumbers(value)} placeholder="Enter phone number"  isMulti={true} />
                    <Form.Control
                        hidden={true}
                        isInvalid={errors?.includePhoneNumbers || includePhoneNumbersErrors.length > 0}
                    /> 
                    <Form.Control.Feedback type="invalid">
                        <ul>
                        {errors?.includePhoneNumbers?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul>
                        <ul>
                            {includePhoneNumbersErrors.map((error,index) => {
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
                    <Creatable 
                        ref={exceptionNumbersRef}
                        value={selectedExcludePhoneNumbers}
                        onChange={(value) => setSelectedExcludePhoneNumbers(value)}
                        placeholder="Enter phone number"  isMulti={true} />
                    <Form.Control
                        hidden={true}
                        isInvalid={errors?.excludePhoneNumbers || excludePhoneNumbersErrors.length > 0}
                    /> 
                    <Form.Control.Feedback type="invalid">
                        <ul>
                        {errors?.excludePhoneNumbers?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul>

                        <ul>
                            {excludePhoneNumbersErrors.map((error,index) => {
                                return <li key={index}>{error}</li>
                            })}
                        </ul>
                    </Form.Control.Feedback>
                </Col>
            </Row>
            <Row className="mb-3 my-10">
                <h3>Sending type</h3>
                <Col xl={3} lg={6} md={6} xs={12}>
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
                <Col xl={3} lg={6} md={6} xs={12}>
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
                <h3>Message</h3>
                {/* <Col xl={12} lg={12} md={12} xs={12}>
                    <Button className="me-1 mb-1" variant="outline-white">First name</Button>
                    <Button className="me-1 mb-1" variant="outline-white">Last name</Button>
                    <Button className="me-1 mb-1" variant="outline-white">Birthday</Button>
                </Col> */}
                <Col xl={12} lg={12} md={12} xs={12}>
                    <Form.Control  isInvalid={errors?.message} value={text} onChange={(e) => setText(e.target.value)} as="textarea" rows={12} />
                    <Form.Control.Feedback type="invalid">
                        <ul>
                        {errors?.message?.map((error,index) => {
                            return <li key={index}>{error}</li>
                        })}
                        </ul>
                    </Form.Control.Feedback>
                </Col>
            </Row>
            <Row>
                {!routine && <Button variant="secondary" onClick={handleSubmit}>Create</Button>}
                {routine && <Button variant="secondary" onClick={handleSubmit}>Save</Button>}
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
						{!routine ? 'Created successfully' : 'Updated Successfully'}
					</Modal.Title>
				</Modal.Header>
			</Modal>
        </Form>
    )
}
export default BatchMessageForm;