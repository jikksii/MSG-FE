// import node module libraries
import { Col, Row, Container, Dropdown, Modal, Button, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from 'widgets'

// import sub components
import {
  AboutMe,
  ActivityFeed,
  MyTeam,
  ProfileHeader,
  ProjectsContributions,
  RecentFromBlog
} from 'sub-components'
import AddressBookLists from 'sub-components/book/AddressBookLists';
import AddressBookContacts from 'sub-components/book/AddressBookContacts';
import ServerSideTable from 'components/Table';
import React, { useState } from 'react';
import { Link } from 'react-bootstrap-icons';
import { MoreHorizontal, MoreVertical } from 'react-feather';
import useHttp from 'hooks/useHttp';

const Contacts = () => {


   


    const options = {
        searchable : true,
        onSearchHandler : function(searchQuery){
            console.log("onSearchHandler")
        },
        columns : [
            {
                name : "phone_number",
                label :"Phone number",
                defaultRender: true
            },
            {
                name : "Full name",
                label :"Full name",
                defaultRender: false,
                overrideRenderHandler: function(item){
                    return <div>{`${item.first_name || ''} ${item.last_name || ''}`}</div>
                }
            },
            
            {
                name : "email",
                label :"Email",
                defaultRender: true
            },
            
        ],
        insertable : true,
        onInsertButtonClick : function(){
            setModalShow(true)
        },
        hasActions : true,
        actions : function(item){
            return (
                <Dropdown.Menu align={'end'}>
                    <Dropdown.Item  onClick={() => {
                        setDetailsModalShow(true)
                        setUpdatingContact(item)
                    }} eventKey="2">
                        Details
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                        setDeleteModalShow(true)
                        setDeleteContact(item)
                    }} eventKey="2">
                        Delete
                    </Dropdown.Item>
                </Dropdown.Menu>
            )
        }

    }

    const [selectedAddressBookList,setSelectedAddressBookList] = useState(null);
    const [contacts,setContacts] = useState([])

    const handleSuccessfullFetch = (data) => {
        setContacts(data.data);
    }

    const handleFetchError = (error) =>{
        console.log(error)
    }
    const { isLoading: isFetchingLists , sendRequest: fetchContacts } = useHttp(handleSuccessfullFetch, handleFetchError)
    

    const listSelectHandler = (list) => {
        setSelectedAddressBookList(list)
        if(list){
            fetchContacts({
                method: 'GET',
                url: `/addressBook/lists/${list.id}/contacts`
            })
        }

    }

    let handleDeleteSuccess = () => {

        fetchContacts({
            method: 'GET',
            url: `/addressBook/lists/${selectedAddressBookList.id}/contacts`
        })
        setDeleteContact(null);
        setDeleteModalShow(false);
    }

    let handleDeleteError = (error) => {
        console.log(error);
    }
    const {sendRequest: destroyContact } = useHttp(handleDeleteSuccess, handleDeleteError)
	const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [deleteContact,setDeleteContact] = useState(null);

    const deleteContactHandler =  () => {
        destroyContact({
            method:'DELETE',
            url: `/addressBook/lists/${selectedAddressBookList.id}/contacts/${deleteContact.id}`
        })
    }






    // Store new contact

    const [modalShow, setModalShow] = useState(false);
    const [errors,setErrors] = useState({});
    const [singleContact,setSingleContact] = useState(true)
    const [newContact,setNewContact] = useState({
        phone_number : '',
        first_name : '',
        last_name : '',
        email : '',
        date_of_birth : '',
    })
    const onModalHideHandler = ()  => {
        setModalShow(false);
        setNewContact({
            phone_number : '',
            first_name : '',
            last_name : '',
            email : '',
            date_of_birth : '',
        })
        setErrors({})
        setImportErrors(null);
        setImportFile(null)
        setSingleContact(true)
    }


    let handleStoreSuccess = (response) => {
        fetchContacts({
            method: 'GET',
            url: `/addressBook/lists/${selectedAddressBookList.id}/contacts`
        })
        onModalHideHandler()
    }
    let handleStoreError = (error) => {
        console.log(error);
        if (error.response.status === 422){
            setErrors(error.response.data.errors)
        }
    }
    const { isLoading: isCreating , sendRequest: storeList } = useHttp(handleStoreSuccess, handleStoreError)

    const createNewContactHandler = () => {
        console.log(newContact)
        storeList({
            method: 'POST',
            url: `/addressBook/lists/${selectedAddressBookList.id}/contacts`,
            data:newContact
        })
    }




    // Details modal

    const [detailsModalShow,setDetailsModalShow] = useState(false);
    const [updateContactErrors,setUpdateContactErrors] = useState({});
    const [updatingContact,setUpdatingContact] = useState(null)

    const onDetailsModalHideHandler = () => {
        
        setDetailsModalShow(false)
        setUpdateContactErrors({})
        setUpdatingContact(null)
    }

    const handleUpdateSuccess =  () => {
        console.log(contacts,updatingContact);
        let newList = contacts.map((element) => element.id === updatingContact.id ? updatingContact : element);
        onDetailsModalHideHandler()
        setContacts(newList);
    }

    const handleUpdateError =  (error) => {
        console.log(error);
        if (error.response.status === 422){
            setUpdateContactErrors(error.response.data.errors)
        }
    }

    const { isLoading: isUpdating , sendRequest: updateContactRequest } = useHttp(handleUpdateSuccess, handleUpdateError)

    const updateContactHandler = () => {
        updateContactRequest({
            method: 'PUT',
            url: `/addressBook/lists/${selectedAddressBookList.id}/contacts/${updatingContact.id}`,
            data:updatingContact
        })
    }




    const handleImportSuccess = () => {
        fetchContacts({
            method: 'GET',
            url: `/addressBook/lists/${selectedAddressBookList.id}/contacts`
        })
        onModalHideHandler()
    }

    const handleImportError = (error) => {
        if (error.response.status === 422){
            setImportErrors(error.response.data.errors)
        }
    }

    const {sendRequest: importContactsRequest} = useHttp(handleImportSuccess, handleImportError)
    const [importFile,setImportFile] = useState(null);
    const [importErrors,setImportErrors] = useState(null)
    const importFileHandler = () => {
        if (importFile) {
            console.log("Uploading file...");
        
            const formData = new FormData();
            formData.append("file", importFile);
        
            importContactsRequest({
                method : 'POST',
                url: `/addressBook/lists/${selectedAddressBookList.id}/contacts/import`,
                data: {
                    contacts : importFile
                },
                headers  :{
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            })
        }
    }

  return (
    <Container fluid className="p-6">

      {/* content */}
      <div className="py-6">
        <Row className='justify-content-start'>

          {/* Projects Contributions */}
          <AddressBookLists onListSelect = {listSelectHandler}/>
          {selectedAddressBookList  && <ServerSideTable className="min-vh-50" options={options} title={`${selectedAddressBookList.name} contacts`}  data={contacts}/>}
          {!selectedAddressBookList && <Col xl={8} lg={12} md={12} xs={12} className="mb-6 d-flex justify-content-center align-items-center"> <span>Select Address book list</span> </Col>}
        </Row>

        <Modal
            show={deleteModalShow}
            onHide={() => {
                setDeleteModalShow(false)
                setDeleteContact(null) 
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
                <Button onClick={deleteContactHandler}>Delete</Button>
            </Modal.Footer>
        </Modal>

        <Modal
                show={modalShow}
                onHide={onModalHideHandler}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						New Contact
					</Modal.Title>
                    <div className='ms-10'>
                        <span onClick={() => setSingleContact(true)} className={`px-2 hover-pointer ${singleContact ? 'text-dark ' : ''}`}>Single</span>
                        <span onClick={() => setSingleContact(false)} className={`px-2 hover-pointer ${!singleContact ? 'text-dark ' : ''}`}>File</span>
                    </div>
				</Modal.Header>
				<Modal.Body>
                    {singleContact &&<Form>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Phone number</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={errors?.phone_number} 
                                    value={newContact.phone_number} 
                                    type="text" 
                                    onChange={(e) => setNewContact((prevState) => {
                                        return {
                                            ...prevState,
                                            phone_number:e.target.value
                                        }
                                    })}
                                    required 
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                    {errors?.phone_number?.map((error,index) => {
                                        return <li key={index}>{error}</li>
                                    })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >First name</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={errors?.first_name} 
                                    value={newContact.first_name} 
                                    type="text" 
                                    onChange={(e) => setNewContact((prevState) => {
                                        return {
                                            ...prevState,
                                            first_name:e.target.value
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                        {errors?.first_name?.map((error,index) => {
                                            return <li key={index}>{error}</li>
                                        })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Last name</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={errors?.last_name} 
                                    value={newContact.last_name} 
                                    type="text" 
                                    onChange={(e) => setNewContact((prevState) => {
                                        return {
                                            ...prevState,
                                            last_name:e.target.value
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                        {errors?.last_name?.map((error,index) => {
                                            return <li key={index}>{error}</li>
                                        })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Email</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={errors?.email} 
                                    value={newContact.email} 
                                    type="text" 
                                    onChange={(e) => setNewContact((prevState) => {
                                        return {
                                            ...prevState,
                                            email:e.target.value
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                        {errors?.email?.map((error,index) => {
                                            return <li key={index}>{error}</li>
                                        })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Date of birth</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={errors?.date_of_birth} 
                                    value={newContact.date_of_birth} 
                                    type="date" 
                                    onChange={(e) => setNewContact((prevState) => {
                                        return {
                                            ...prevState,
                                            date_of_birth:e.target.value
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                        {errors?.date_of_birth?.map((error,index) => {
                                            return <li key={index}>{error}</li>
                                        })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    </Form>}
                    {!singleContact && 
                    
                        <Form>
                            <Row className="mb-3">
                                <Form.Label className="col-sm-4" >File</Form.Label>
                                <Col md={8} xs={12}>
                                    <Form.Control 
                                        isInvalid={importErrors}
                                        type="file"
                                        accept=".xlsx , .xls"
                                        onChange={(event) => {
                                            setImportFile(event.target.files[0])
                                        }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        <ul>
                                        {importErrors?.map((error,index) => {
                                            return <li key={index}>{error}</li>
                                        })}
                                        </ul>
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                        </Form>
                    
                    
                    }
				</Modal.Body>
				<Modal.Footer>
                    {singleContact  && <Button onClick={createNewContactHandler}>Create</Button>}
                    {!singleContact  && <Button onClick={importFileHandler}>Import</Button>}
				</Modal.Footer>
		</Modal>


        {updatingContact && <Modal
                show={detailsModalShow}
                onHide={onDetailsModalHideHandler}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Edit Contact
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Phone number</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={updateContactErrors?.phone_number} 
                                    value={updatingContact.phone_number} 
                                    type="text" 
                                    onChange={(e) => setUpdatingContact((prevState) => {
                                        return {
                                            ...prevState,
                                            phone_number:e.target.value
                                        }
                                    })}
                                    required 
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                    {updateContactErrors?.phone_number?.map((error,index) => {
                                        return <li key={index}>{error}</li>
                                    })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >First name</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={updateContactErrors?.first_name} 
                                    value={updatingContact.first_name} 
                                    type="text" 
                                    onChange={(e) => setUpdatingContact((prevState) => {
                                        return {
                                            ...prevState,
                                            first_name:e.target.value
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                        {updateContactErrors?.first_name?.map((error,index) => {
                                            return <li key={index}>{error}</li>
                                        })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Last name</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={updateContactErrors?.last_name} 
                                    value={updatingContact.last_name} 
                                    type="text" 
                                    onChange={(e) => setUpdatingContact((prevState) => {
                                        return {
                                            ...prevState,
                                            last_name:e.target.value
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                        {updateContactErrors?.last_name?.map((error,index) => {
                                            return <li key={index}>{error}</li>
                                        })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Email</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={updateContactErrors?.email} 
                                    value={updatingContact.email} 
                                    type="text" 
                                    onChange={(e) => setUpdatingContact((prevState) => {
                                        return {
                                            ...prevState,
                                            email:e.target.value
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                        {updateContactErrors?.email?.map((error,index) => {
                                            return <li key={index}>{error}</li>
                                        })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >Date of birth</Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control 
                                    isInvalid={updateContactErrors?.date_of_birth} 
                                    value={updatingContact.date_of_birth} 
                                    type="date" 
                                    onChange={(e) => setUpdatingContact((prevState) => {
                                        return {
                                            ...prevState,
                                            date_of_birth:e.target.value
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                        {updateContactErrors?.date_of_birth?.map((error,index) => {
                                            return <li key={index}>{error}</li>
                                        })}
                                    </ul>
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    </Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={updateContactHandler}>Save</Button>
				</Modal.Footer>
		</Modal>}
      </div>

    </Container>
  )
}

export default Contacts