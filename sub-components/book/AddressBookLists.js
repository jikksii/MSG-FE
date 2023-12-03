// import node module libraries
import React, { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { Col, Card, Dropdown, Image, Modal, Button, Form, Row } from 'react-bootstrap';
import { MoreVertical, PlusCircle } from 'react-feather';


// import required data files
import ProjectsContributionsData from 'data/profile/ProjectsContributionsData';
import useHttp from "hooks/useHttp";

const AddressBookLists = ({onListSelect,onListAddClicked}) => {


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


    const ActionMenu = ({list}) => {
        const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
            (<Link
                href=""
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
                className="text-muted text-primary-hover">
                {children}
            </Link>)
        ));
    
        CustomToggle.displayName = 'CustomToggle';
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                    <MoreVertical size="20px" className="text-muted" />
                </Dropdown.Toggle>
                <Dropdown.Menu align={'end'}>
                    <Dropdown.Item onClick={() => {
                        setUpdateList(list)
                        setUpdateModalShow(true)
                    }} eventKey="1">
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                        setDeleteModalShow(true)
                        setDeleteList(list)
                    }} eventKey="2">
                        Delete
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    const [addressBookLists,setAddressBookLists] = useState([])

    const [selectedAddressBookList,setSelectedAddressBookList] = useState(null);

    const [newAddressBookList,setNewAddressBookList] = useState({
        name: '',
        description : ''
    });

    const [errors,setErrors] = useState({});

    const addButtonClickHandler = (event) => {
        event.preventDefault();
        setModalShow(true)
    }
    
	const [modalShow, setModalShow] = useState(false);

    const listSelectHandler = (list) => {
        setSelectedAddressBookList(list);
        onListSelect(list)
    }

    const onModalHideHandler = ()  => {
        setModalShow(false);
        setNewAddressBookList({
            name : '',
            description : ''
        })
        setErrors({})
    }


    let handleStoreSuccess = (response) => {
        setAddressBookLists([
            ...addressBookLists,
            response.data
        ])

        onModalHideHandler()
    }
    let handleStoreError = (error) => {
        console.log(error);
        if (error.response.status === 422){
            setErrors(error.response.data.errors)
        }
    }
    const { isLoading: isCreating , sendRequest: storeList } = useHttp(handleStoreSuccess, handleStoreError)

    const createNewListHandler = () => {
        storeList({
            method: 'POST',
            url: "/addressBook/lists",
            data:newAddressBookList
        })
    }


    // Delete List 

    let handleDeleteSuccess = () => {
        let newList = addressBookLists.filter((element) => element.id !== deleteList.id);
        if(deleteList.id === selectedAddressBookList?.id){
            listSelectHandler(null)
        }
        setDeleteList(null);
        setDeleteModalShow(false);
        setAddressBookLists(newList);
        console.log(newList);
    }

    let handleDeleteError = (error) => {
        console.log(error);
    }
    const {sendRequest: destroyList } = useHttp(handleDeleteSuccess, handleDeleteError)
	const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [deleteList,setDeleteList] = useState(null);

    const deleteListHandler =  () => {
        destroyList({
            method: 'DELETE',
            url: `/addressBook/lists/${deleteList.id}`,
        })
    }



    // Edir list

    let handleUpdateSuccess = () => {
        let newList = addressBookLists.map((element) => updateList.id === element.id ? updateList : element);
        if(updateList.id === selectedAddressBookList?.id){
            listSelectHandler(updateList)
        }
        setAddressBookLists(newList);
        updateModalHideHandler();
    }

    let handleUpdateError = (error) => {
        if (error.response.status === 422){
            setUpdateListErrors(error.response.data.errors)
        }
    }
    const {sendRequest: updateListRequest } = useHttp(handleUpdateSuccess, handleUpdateError)
	const [updateModalShow, setUpdateModalShow] = useState(false);
    const [updateList,setUpdateList] = useState(null);
    const [updateListErrors,setUpdateListErrors] = useState(null);

    const updateListHandler =  () => {
        updateListRequest({
            method: 'PUT',
            url: `/addressBook/lists/${updateList.id}`,
            data:updateList
        })
    }

    const updateModalHideHandler = () => {
        setUpdateListErrors(null);
        setUpdateList(null)
        setUpdateModalShow(false)
    }

    return (
        <Col xl={4} lg={12} md={12} xs={12} className="mb-6">
            <Card>
                <Card.Body>
                    <Card.Title as="h4"></Card.Title>
                    <Card.Title as="h4" className="d-flex justify-content-between align-items-center">
                        <label>Address Book Lists</label>

                        <div><a onClick={addButtonClickHandler} href="#"><PlusCircle color="green"/></a> </div>
                        
                    </Card.Title>

                    {isFetchingLists && 
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                                        }
                    {!isFetchingLists && addressBookLists.map((item, index) => {
                        return (
                            <div
                            className={`d-md-flex p-2 justify-content-between align-items-center mb-4 hover-pointer hover-bg-light ${item.id === selectedAddressBookList?.id ? "bg-gray-200" : ""}`} key={index}>
                                <div onClick={() => listSelectHandler(item)}  className="d-flex flex-fill align-items-center">
                                    <div>
                                        <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}>
                                            <Image src={item.brandLogo} alt="" />
                                        </div>
                                    </div>
                                    {/* text */}
                                    <div className="ms-3 flex-grow-1">
                                        <h5 className="mb-1">
                                            <span href="#" className="text-inherit">{item.name}</span>
                                        </h5>
                                        <p className="mb-0 fs-5 text-muted">{item.description}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center ms-10 ms-md-0">
                                    <div>
                                        {/* dropdown */}
                                        <ActionMenu key={index} list={item}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {
                        !isFetchingLists && addressBookLists.length == 0 && <div>List is empty</div>
                    }
                </Card.Body>
            </Card>
            <Modal
                show={modalShow}
                onHide={onModalHideHandler}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						New List
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Name</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={errors?.name} 
                                    value={newAddressBookList.name} 
                                    type="text" 
                                    placeholder="Name"
                                    onChange={(e) => setNewAddressBookList((prevState) => {
                                        return {
                                            ...prevState,
                                            name:e.target.value
                                        }
                                    })}
                                    required 
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                    {errors?.name?.map((error,index) => {
                                        return <li key={index}>{error}</li>
                                    })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Description</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={errors?.description} 
                                    value={newAddressBookList.description} 
                                    type="text" 
                                    placeholder="Description"
                                    onChange={(e) => setNewAddressBookList((prevState) => {
                                        return {
                                            ...prevState,
                                            description:e.target.value
                                        }
                                    })}
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
                    </Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={createNewListHandler}>Create</Button>
				</Modal.Footer>
			</Modal>
            <Modal
                show={deleteModalShow}
                onHide={() => {
                    setDeleteModalShow(false)
                    setDeleteList(null) 
                }}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Are you sure you want delete list?
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button onClick={deleteListHandler}>Delete</Button>
				</Modal.Footer>
			</Modal>

            {updateList && <Modal 
                show={updateModalShow}
                onHide={updateModalHideHandler}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Update List
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Name</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={updateListErrors?.name} 
                                    value={updateList.name} 
                                    type="text" 
                                    placeholder="Name"
                                    onChange={(e) => setUpdateList((prevState) => {
                                        return {
                                            ...prevState,
                                            name:e.target.value
                                        }
                                    })}
                                    required 
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                    {updateListErrors?.name?.map((error,index) => {
                                        return <li key={index}>{error}</li>
                                    })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Description</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={updateListErrors?.description} 
                                    value={updateList.description} 
                                    type="text" 
                                    placeholder="Description"
                                    onChange={(e) => setUpdateList((prevState) => {
                                        return {
                                            ...prevState,
                                            description:e.target.value
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                        {updateListErrors?.description?.map((error,index) => {
                                            return <li key={index}>{error}</li>
                                        })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    </Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={updateListHandler}>Save</Button>
				</Modal.Footer>
			</Modal>}
        </Col>
    )
}

export default AddressBookLists