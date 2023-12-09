import { Card } from 'react-bootstrap';
import { Briefcase } from 'react-bootstrap-icons';
import styles from './Stat.module.css'
import useHttp from 'hooks/useHttp';
import { useCallback, useEffect, useState } from 'react';

const StatTodaysMessages = () => {

    const [data,setData] = useState(null);
    const handleError = useCallback(() => {

    },[]);

    const handleSuccessFetch = useCallback(
        (data) =>{
        setData(data.data);
    },
    []);
    const { isLoading , sendRequest: fetch } = useHttp(handleSuccessFetch, handleError);

    useEffect(()=> {
        fetch({
            method: 'GET',
            url: "/statistic/messages/today"
        })
    },[])


    return (
        <Card className={`${styles.stats}`}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0">Todays Messages</h4>
                    </div>
                    <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <Briefcase size={18}/>
                    </div>
                </div>
                {isLoading &&
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                {
                    !isLoading && data &&
                    <div>
                        <h1 className="fw-bold text-center">{data.total}</h1>
                        <div className="mb-0 d-flex w-100 justify-content-between">
                            <span cla className={`${styles.sub} col-1 text-success`}>Delivered</span><span className="text-dark me-2">{data.delivered}</span>
                        </div>
                        <p className="mb-0 d-flex justify-content-between">
                            <span className={`${styles.sub} text-secondary`}>Pending</span><span className="text-dark me-2">{data.pending}</span>
                        </p>
                        <p className="mb-0 d-flex justify-content-between">
                            <span className={`${styles.sub} text-danger`}>Failed</span><span className="text-dark me-2">{data.failed}</span>
                        </p>
                    </div>
                }
            </Card.Body>
        </Card>
    )
}

export default StatTodaysMessages