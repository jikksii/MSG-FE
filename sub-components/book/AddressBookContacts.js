// import node module libraries
import React from "react";
import Link from 'next/link';
import { Col, Card, Dropdown, Image, Tab, Nav, Pagination, Form, Table } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';

// import required data files
import ProjectsContributionsData from 'data/profile/ProjectsContributionsData';
import { HighlightCode } from "widgets";
import { DisabledActiveCode } from "data/code/PaginationsCode";

const AddressBookContacts = ({contacts}) => {


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

    const list = [
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
    ];

    return (
        <Col xl={8} lg={12} md={12} xs={12} className="mb-6">
            <Card>
                <Card.Body>
                    <Card.Title as="h4" className="d-flex justify-content-between align-items-center">
                        <label>{title}</label>
                        <div className="ms-lg-3 d-none d-md-none d-lg-block">
                            {/* Search Form */}
                            <Form className="d-flex">
                                <Form.Control type="search" placeholder="Search" />
                            </Form>
                        </div>
                        <div>Add</div>
                    </Card.Title>
                    <Table className="text-nowrap">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Phone number</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => {
                                return(
                                    <>
                                        <tr>
                                            <td scope="row">{item.first_name}</td>
                                            <td scope="row">{item.last_name}</td>
                                            <td scope="row">{item.phone_number}</td>
                                            <td scope="row"><ActionMenu/></td>
										</tr>
                                        
                                    </>
                                )
                            })
                            }
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev disabled>Previous</Pagination.Prev>
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Item active>{2}</Pagination.Item>
                        <Pagination.Item>{3}</Pagination.Item>
                        <Pagination.Next>Next</Pagination.Next>
                    </Pagination>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default AddressBookContacts