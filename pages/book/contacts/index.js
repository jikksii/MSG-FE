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
import ServerSideTable from 'components/Table';

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
    <Container fluid className="p-6">
      <ServerSideTable options={options} lg={12} xl={12} title={"Title here"}  data={list}/>
    </Container>
  )
}

export default Contacts