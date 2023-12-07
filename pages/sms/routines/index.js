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
import { Bold, MoreHorizontal, MoreVertical } from 'react-feather';
import useHttp from 'hooks/useHttp';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SmsQueue = () => {


    const [list,setList] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [lastPage,setLastPage] = useState(1);
    const router = useRouter();

    const handleFetchRoutines = useCallback(
        (data) => {
            setList(data.data.data);
            setCurrentPage(data.data.current_page)
            setLastPage(data.data.last_page)
        },
        []
    )
    const handleFetchRoutinesError = useCallback(
        (error) => {

        },
        []
    )
    const { isLoading: isFetchingLists , sendRequest: fetchRoutines } = useHttp(
        handleFetchRoutines,
        handleFetchRoutinesError
    )

    const handlePageChange = (page) => {
        fetchContacts({
            method: 'GET',
            url: `/routines/routines?page=${page}`
        })
    }

    useEffect(() => {
        fetchRoutines(
            {
                url:'routines/routines',
                method:'GET'
            }
        )
    },[fetchRoutines])


    const options = {
        searchable : false,
        columns : [
            {
                name:"type",
                label:"Periodicity",
                defaultRender: false,
                overrideRenderHandler: function(item){
                    return <div>{item.type.name}</div>
                }
            },
            {
                name:"",
                label:"Range",
                defaultRender: false,
                overrideRenderHandler: function(item){
                    return (
                        <Row className='justify-content-start'>
                            <Col xl={12}>
                                <span style={{fontWeight:'bold'}}>From</span><span>{` ${item.start_date} `}</span><span style={{fontWeight:'bold'}}>To</span><span>{` ${item.end_date} `}</span>
                            </Col>
                            <Col xl={12}>
                                <span style={{fontWeight:'bold'}}>At</span><span>{` ${item.next_execution_time} `}</span>
                                {item.type.id ===4 && 
                                <Col xl={12}>
                                    <span style={{fontWeight:'bold'}}>On </span><span>{` ${item.day_of_month}`}</span><span>th Day of Month</span>
                                </Col>}
                            </Col>
                            {
                                item.type.id ===3 && 
                                <Col xl={12}>
                                    <span style={{fontWeight:'bold'}}>Every:</span>
                                    <span style={{fontStyle:'italic'}}>{` ${item.send_on_monday  ? 'Monday': ''} `}</span>
                                    <span style={{fontStyle:'italic'}}>{` ${item.send_on_tuesday  ? 'Tuesday': ''} `}</span>
                                    <span style={{fontStyle:'italic'}}>{` ${item.send_on_wednesday  ? 'Wednesday': ''} `}</span>
                                    <span style={{fontStyle:'italic'}}>{` ${item.send_on_thursday  ? 'Thursday': ''} `}</span>
                                    <span style={{fontStyle:'italic'}}>{` ${item.send_on_friday  ? 'Friday': ''} `}</span>
                                    <span style={{fontStyle:'italic'}}>{` ${item.send_on_saturday  ? 'Saturday': ''} `}</span>
                                    <span style={{fontStyle:'italic'}}>{` ${item.send_on_sunday  ? 'Sunday': ''} `}</span>
                                </Col>
                            }
                            
                        </Row>
                    )

                }
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
        hasActions: true,
        actions: function (item) {
            const handleEdit = () => {
                router.push(`/sms/message/${item.id}`)
            }
            return (
                <Dropdown.Menu align={'end'}>
                    <Dropdown.Item onClick={handleEdit} eventKey="1">
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                        Delete
                    </Dropdown.Item>
                </Dropdown.Menu>
            )
        }
    }

    return (
        <Container fluid className="p-6">

        {/* content */}
        <div className="py-6">
            <Row className='justify-content-start'>
            <ServerSideTable xl={12} options={options} title={"Routines"}  
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