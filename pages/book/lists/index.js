// import node module libraries
import { Col, Row, Container, Dropdown, Modal, Button } from 'react-bootstrap';

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
            console.log("onInsertButtonClick")
        },
        hasActions : true,
        actions : function(item){
            return (
                <Dropdown.Menu align={'end'}>
                    <Dropdown.Item eventKey="1">
                        Edit {item.id}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                        setDeleteModalShow(true)
                        setDeleteContact(item)
                    }} eventKey="2">
                        Delete
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                        Details
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
        let newList = contacts.filter((element) => element.id !== deleteContact.id);
        setDeleteContact(null);
        setDeleteModalShow(false);
        setContacts(newList);
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
      </div>

    </Container>
  )
}

export default Contacts