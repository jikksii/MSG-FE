import { Card } from 'react-bootstrap';
import { Briefcase, Person } from 'react-bootstrap-icons';
import styles from './Stat.module.css'
import { useCallback, useEffect, useState } from 'react';
import useHttp from 'hooks/useHttp';

const StatContacts = () => {

    const [data, setData] = useState(null);
    const handleError = useCallback(() => {

    }, []);

    const handleSuccessFetch = useCallback(
        (data) => {
            setData(data.data);
        },
        []);
    const { isLoading, sendRequest: fetch } = useHttp(handleSuccessFetch, handleError);

    useEffect(() => {
        fetch({
            method: 'GET',
            url: "/statistic/messages/contacts"
        })
    }, [])
    return (
        <Card className={`${styles.stats}`}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0">Contacts</h4>
                    </div>
                    <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <Person size={18}/>
                    </div>
                </div>
                {isLoading &&
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                {!isLoading && data &&
                    <div>
                    <h1 className="fw-bold  text-center">{data.count}</h1>
                </div>
                }
                
            </Card.Body>
        </Card>
    )
}

export default StatContacts