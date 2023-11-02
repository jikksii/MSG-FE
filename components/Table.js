// import node module libraries
import React from "react";
import Link from 'next/link';
import { Col, Card, Dropdown, Image, Tab, Nav, Pagination, Form, Table } from 'react-bootstrap';
import { MoreVertical, PlusCircle } from 'react-feather';

const ServerSideTable = ({options,data, title , xl, lg, md, xs}) => {

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
        <Col xl={xl ? xl :8} lg={lg ? lg :12} md={md ? md :12} xs={xs ? xs:12} className="mb-6">
            <Card>
                <Card.Body>
                    <Card.Title as="h4" className="d-flex justify-content-between align-items-center">
                        <label>{title}</label>
                        {
                            options.searchable && 
                            <div className="ms-lg-3 d-none d-md-none d-lg-block">
                                {/* Search Form */}
                                <Form className="d-flex">
                                    <Form.Control type="search" placeholder="Search" />
                                </Form>
                            </div>
                        }

                        {
                            options.insertable && 
                            <div><a onClick={(e) => e.preventDefault()} href="#"><PlusCircle color="green"/></a> </div>
                        }
                        
                    </Card.Title>
                    <Table className="text-nowrap">
                        <thead className="table-light">
                            <tr>
                                {options.columns.map((item, index) => {
                                    return <th key={"header_" + index} scope="col">{item.label}</th>;
                                })}
                                {options.hasActions && <th key={`header_0`} scope="col">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index1) => {
                                return(
                                    <tr key={`ROW_${index1}`}>
                                            {options.columns.map((column,index2) => {
                                                if(column.defaultRender){
                                                    return <td key={`Table_row_${index2}_${index1}`} scope="row">{item[column.name]}</td>
                                                }else{
                                                    return <td key={`Table_row_${index2}_${index1}`} scope="row">
                                                        {column.overrideRenderHandler(item)}
                                                    </td>
                                                }
                                                
                                            })}

                                            {options.hasActions &&
                                            <td key={`DropDown_${index1}`} scope="row">
                                                <Dropdown>
                                                    <Dropdown.Toggle as={CustomToggle}>
                                                        <MoreVertical size="15px" className="text-muted" />
                                                    </Dropdown.Toggle>
                                                    {options.actions(item)}
                                                 </Dropdown>
                                            </td>
                                            }
									</tr>
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

export default ServerSideTable