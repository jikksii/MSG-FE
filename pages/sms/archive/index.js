// import node module libraries
import { Col, Row, Container, Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';

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
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-bootstrap-icons';
import { MoreHorizontal, MoreVertical } from 'react-feather';
import useHttp from 'hooks/useHttp';

const SmsQueue = () => {


    const [list,setList] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [lastPage,setLastPage] = useState(1);



    const handleBatchMessagesFetch = useCallback(
        (data) => {
            setList(data.data.data);
            setCurrentPage(data.data.current_page)
            setLastPage(data.data.last_page)
        },
        []
    )

    const handleBatchMessageFetchError = useCallback(
        (error) => {
        },
        []
    )
    const { isLoading: isFetchingLists , sendRequest: fetchBatchMessages } = useHttp(
        handleBatchMessagesFetch, 
        handleBatchMessageFetchError
    )

    const handlePageChange = (page) => {
        fetchContacts({
            method: 'GET',
            url: `/batch/messages?page=${page}`
        })
    }

    useEffect(() => {
        fetchBatchMessages(
            {
                url:`/batch/messages?page=${currentPage}`,
                method:'GET'
            }
        )
    },[fetchBatchMessages, currentPage])


    const options = {
        searchable : false,
        columns : [
            {
                name : "periodicity",
                label :"Periodicity",
                defaultRender: true
            },
            {
                name : "description",
                label :"Description",
                defaultRender: false,
                overrideRenderHandler: function (item) {
                    const tooltip = (
                        <Tooltip id="tooltip">
                            {item.description}
                        </Tooltip>
                    );
                    
                    return (
                        <OverlayTrigger placement="bottom" overlay={tooltip}>
                            <div className='d-inline-block text-truncate' style={{ maxWidth: "150px" }}>{item.description}</div>
                        </OverlayTrigger>
                    )
                }
            },
            {
                name : "created_at",
                label :"Date",
                defaultRender: true
            },
            {
                name : "total",
                label :"Total",
                defaultRender: true
            },
            {

                name : "delivered",
                label :"Delivered",
                defaultRender: true
            },
            {
                name : "failed",
                label :"Failed",
                defaultRender: true
            },
            {
                name : "pending",
                label :"Pending",
                defaultRender: true
            },
            {
                name: "message",
                label: "Message",
                defaultRender: false,
                overrideRenderHandler: function (item) {
                    const tooltip = (
                        <Tooltip id="tooltip">
                            {item.message}
                        </Tooltip>
                    );
                    
                    return (
                        <OverlayTrigger placement="bottom" overlay={tooltip}>
                            <div className='d-inline-block text-truncate' style={{ maxWidth: "150px" }}>{item.message}</div>
                        </OverlayTrigger>
                    )
                }
            }
            
        ],
        insertable : false,
        onInsertButtonClick : function(){
            console.log("onInsertButtonClick")
        },
        hasActions : false,
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

    console.log(list);
    return (
        <Container fluid className="p-6">

        {/* content */}
        <div className="py-6">
            <Row className='justify-content-start'>
            <ServerSideTable xl={12} options={options} title={"Batch Messages"}  
                data={list} 
                currentPage={currentPage}
                lastPage={lastPage}
                handlePageChange={handlePageChange}
            />
            </Row>

        </div>

        </Container>
    )
}

export default SmsQueue