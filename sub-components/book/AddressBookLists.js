// import node module libraries
import React, { useState } from "react";
import Link from 'next/link';
import { Col, Card, Dropdown, Image } from 'react-bootstrap';
import { MoreVertical, PlusCircle } from 'react-feather';


// import required data files
import ProjectsContributionsData from 'data/profile/ProjectsContributionsData';

const AddressBookLists = ({onListSelect,onListAddClicked}) => {



    
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

    const ActionMenu = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                    <MoreVertical size="15px" className="text-muted" />
                </Dropdown.Toggle>
                <Dropdown.Menu align={'end'}>
                    <Dropdown.Item eventKey="1">
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                        Delete
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    const [addressBookLists,setAddressBookLists] = useState(
        [
            {
                id: 1,
                name: "Address book list 1",
                description: "List description and details about...",
                brandLogo: '/images/brand/slack-logo.svg'
            },
            {
                id: 2,
                name: "Address book list 2",
                description: "List description and details about...",
                brandLogo: '/images/brand/slack-logo.svg'
            },
            {
                id: 3,
                name: "Address book list 3",
                description: "List description and details about...",
                brandLogo: '/images/brand/slack-logo.svg'
            },
            {
                id: 4,
                name: "Address book list 4",
                description: "List description and details about...",
                brandLogo: '/images/brand/slack-logo.svg'
            },
            {
                id: 5,
                name: "Address book list 5",
                description: "List description and details about...",
                brandLogo: '/images/brand/slack-logo.svg'
            },
        ]
    )

    const [selectedAddressBookList,setSelectedAddressBookList] = useState(null);


    const addButtonClickHandler = (event) => {
        event.preventDefault();
        onListAddClicked();
    }

    const listSelectHandler = (list) => {
        setSelectedAddressBookList(list);
        onListSelect(list)
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
                    {addressBookLists.map((item, index) => {
                        return (
                            <div onClick={() => listSelectHandler(item)} 
                            className={`d-md-flex p-2 justify-content-between align-items-center mb-4 hover-pointer hover-bg-light ${item.id === selectedAddressBookList?.id ? "bg-gray-200" : ""}`} key={index}>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}>
                                            <Image src={item.brandLogo} alt="" />
                                        </div>
                                    </div>
                                    {/* text */}
                                    <div className="ms-3 ">
                                        <h5 className="mb-1">
                                            <span href="#" className="text-inherit">{item.name}</span>
                                        </h5>
                                        <p className="mb-0 fs-5 text-muted">{item.description}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center ms-10 ms-md-0">
                                    <div>
                                        {/* dropdown */}
                                        <ActionMenu/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default AddressBookLists