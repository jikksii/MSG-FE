import useHttp from "hooks/useHttp";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import Creatable from 'react-select/creatable';
import BatchMessageForm from "sub-components/sms/BatchMessageForm";

const { default: ServerSideTable } = require("components/Table");

const Message = () => {


    const batchRef = useRef()
    const router = useRouter()
    
    const [routine,setRoutine] = useState(null);
    const handleFetchRoutine  = useCallback(
        (data) => {
            setRoutine(data.data);
        },
        []
    )

    const handleFetchRoutineError = useCallback(
        () => {},[]
    )
    const {isLoading : f, sendRequest : fetchRoutine} = useHttp(handleFetchRoutine,handleFetchRoutineError)


    useEffect(() => {
        const id = router.query.id;
        if(!id){
            return
        }
        fetchRoutine({
            method: 'GET',
            url: `/routines/${id[0]}`
        })
    }, [router]);
    return (
        <Container fluid className="p-6">
            <BatchMessageForm isRoutine={false} routine={routine} />
        </Container>
    );
}
export default Message;