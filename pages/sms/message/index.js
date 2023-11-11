import { useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import Creatable from 'react-select/creatable';
import BatchMessageForm from "sub-components/sms/BatchMessageForm";

const { default: ServerSideTable } = require("components/Table");

const Message = () => {


    const batchRef = useRef()
    return (
        <Container fluid className="p-6">
            <BatchMessageForm isRoutine={false} />
        </Container>
    );
}
export default Message;