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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-bootstrap-icons';
import { MoreHorizontal, MoreVertical } from 'react-feather';
import useHttp from 'hooks/useHttp';

const SmsQueue = () => {


    const [list,setList] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [lastPage,setLastPage] = useState(1);
    const { isLoading: isFetchingLists , sendRequest: fetchOneTimeRoutines } = useHttp(
        (data) => {
            setList(data.data.data);
            setCurrentPage(data.data.current_page)
            setLastPage(data.data.last_page)
        }, 
        (error) =>{

        }
    )

    const handlePageChange = (page) => {
        fetchContacts({
            method: 'GET',
            url: `/routines/oneTime?page=${page}`
        })
    }

    useEffect(() => {
        fetchOneTimeRoutines(
            {
                url:'routines/oneTime',
                method:'GET'
            }
        )
    },[])


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
                name : "start_date",
                label :"Send date",
                defaultRender: true
            },
            {
                name : "next_execution_time",
                label :"Time",
                defaultRender: true
            },
            {
                name : "description",
                label :"Description",
                defaultRender: true
            },
            {
                name : "message",
                label :"Message",
                defaultRender: true
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

    return (
        <Container fluid className="p-6">

        {/* content */}
        <div className="py-6">
            <Row className='justify-content-start'>
            <ServerSideTable xl={12} options={options} title={"One time queue"}  
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