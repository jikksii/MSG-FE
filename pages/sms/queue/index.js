// import node module libraries
import { Col, Row, Container, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';

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

import useSWR from 'swr'
import fetcher from 'utils/fetcher';
import axiosInstance from 'utils/axiosInstance';

const SmsQueue = () => {


    const [list, setList] = useState([]);
    const [page, setCurrentPage] = useState(1);


    let data = null;
    const { data: response, error, isLoading } = useSWR(`/routines/oneTime?page=${page}`, axiosInstance)

    if (!isLoading) {
        data = response.data
    }
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const options = {
        searchable: false,
        columns: [
            {
                name: "type",
                label: "Periodicity",
                defaultRender: false,
                overrideRenderHandler: function (item) {
                    return <div>{item.type.name}</div>
                }
            },
            {
                name: "start_date",
                label: "Send date",
                defaultRender: true
            },
            {
                name: "next_execution_time",
                label: "Time",
                defaultRender: true
            },
            {
                name: "description",
                label: "Description",
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
        insertable: false,
        onInsertButtonClick: function () {
            console.log("onInsertButtonClick")
        },
        hasActions: false,
        actions: function (item) {
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

                    {!isLoading && data &&

                        <ServerSideTable xl={12} options={options} title={"One time queue"}
                            data={data.data.data}
                            currentPage={data.data.current_page}
                            lastPage={data.data.last_page}
                            handlePageChange={handlePageChange}
                        />
                    }

                </Row>

            </div>

        </Container>
    )
}

export default SmsQueue