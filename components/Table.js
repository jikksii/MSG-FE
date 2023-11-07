// import node module libraries
import React from "react";
import Link from 'next/link';
import { Col, Card, Dropdown, Image, Tab, Nav, Pagination, Form, Table, Row } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical, PlusCircle } from 'react-feather';

const ServerSideTable = ({className,options,data, title , xl, lg, md, xs,currentPage,lastPage,handlePageChange}) => {

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

    const onAddButtonClickedHandler =  (event) => {
        event.preventDefault();
        options.onInsertButtonClick();
    }

    const generatePaginationButtons = () => {

        let array = [-1,0,1];
        if(currentPage === 1){
            array = [0,1,2];
        }

        if(currentPage === lastPage){
            array = [-2,-1,0];
        }
        let list = [];
        array.forEach((i,index) => {
            let value = currentPage + i;
            if(!(value < 1 || value > lastPage)){
                list.push(
                    <Pagination.Item  onClick={() => handlePageChange(value)} active={value == currentPage}>{value}</Pagination.Item> 
                )
            }
        });
        return list;
    }

    return (
        <Col xl={xl ? xl :8} lg={lg ? lg :12} md={md ? md :12} xs={xs ? xs:12} className={`mb-6 ${className}`}>
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
                            <div><a onClick={onAddButtonClickedHandler} href="#"><PlusCircle color="green"/></a> </div>
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
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1}><ChevronsLeft size="18px" /></Pagination.First> 

                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><ChevronLeft size="18px" /></Pagination.Prev> 


                        {generatePaginationButtons()}

                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === lastPage}><ChevronRight size="18px"  /></Pagination.Next>
                        
                        <Pagination.Last onClick={() => handlePageChange(lastPage)}disabled={currentPage === lastPage}><ChevronsRight size="18px" /></Pagination.Last> 
                    </Pagination>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ServerSideTable