// import node module libraries
import { Col, Row, Container, Dropdown } from 'react-bootstrap';

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

const Contacts = () => {


   


    const options = {
        searchable : true,
        onSearchHandler : function(searchQuery){
            console.log("onSearchHandler")
        },
        columns : [
            {
                name : "Full name",
                label :"Full name",
                defaultRender: false,
                overrideRenderHandler: function(item){
                    return <div>{`${item.first_name} ${item.last_name}`}</div>
                }
            },
            {
                name : "phone_number",
                label :"Phone number",
                defaultRender: true
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
                    <Dropdown.Item eventKey="2">
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
    const [contacts,setContacts] = useState(
        [
            {
                id: 1,
                first_name: "Giorgi",
                last_name: "Jikia",
                gender : "Male",
                phone_number : "595100506",
                email : "giorgiijikia@gmail.com",
                date_of_birth : "1998-13-05",
                note : "Some note",
                brandLogo: '/images/brand/slack-logo.svg'
            },
            {
                id: 1,
                first_name: "Giorgi",
                last_name: "Jikia",
                gender : "Male",
                phone_number : "595100506",
                email : "giorgiijikia@gmail.com",
                date_of_birth : "1998-13-05",
                note : "Some note",
                brandLogo: '/images/brand/slack-logo.svg'
            },
        ]
    )

    const listSelectHandler = (list) => {
        setSelectedAddressBookList(list)
    }

    const onListAddHandler = () => {
        console.log("Add new group");
    }


  return (
    <Container fluid className="p-6">

      {/* content */}
      <div className="py-6">
        <Row className='justify-content-start'>

          {/* Projects Contributions */}
          <AddressBookLists onListSelect = {listSelectHandler}/>
          {selectedAddressBookList && <ServerSideTable options={options} title={`${selectedAddressBookList.name} contacts`}  data={contacts}/>}
          {!selectedAddressBookList && <Col xl={8} lg={12} md={12} xs={12} className="mb-6 d-flex justify-content-center align-items-center"> <span>Select Address book list</span> </Col>}
        </Row>
      </div>

    </Container>
  )
}

export default Contacts