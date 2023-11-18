// import node module libraries
import { Fragment } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

// import required data files
import {
	Briefcase,
    ListTask,
    People,
    Bullseye
} from 'react-bootstrap-icons';

export const ProjectsStats = [
    {
       id:1,
       title : "Active Routines",
       value : 18,
       icon: <Briefcase size={18}/>,
       statInfo: '<span className="text-dark me-2">2</span> Completed' 
    },
    {
        id:2,
        title : "Total Batch Messages",
        value : 132,
        icon: <ListTask size={18}/>,
        statInfo: '<span className="text-dark me-2">5</span> Sent this month' 
    },
    {
        id:3,
        title : "Teams",
        value : 12,
        icon: <People size={18}/>,
        statInfo: '<span className="text-dark me-2">1</span> Completed' 
    },
    {
        id:4,
        title : "Productivity",
        value : '76%',
        icon: <Bullseye size={18}/>,
        statInfo: '<span className="text-dark me-2">5%</span> Completed' 
    }
];

const Home = () => {
    return (
        <Fragment>
            <div className="bg-secondary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        {/* Page header */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    <h3 className="mb-0  text-white">Dashboard</h3>
                                </div>
                            </div>
                        </div>
                    </Col>
                    {ProjectsStats.map((item, index) => {
                        return (
                            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                                <StatRightTopIcon info={item} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </Fragment>
    )
}
export default Home;
