import { Card } from 'react-bootstrap';
import { ArrowClockwise, Briefcase } from 'react-bootstrap-icons';
import styles from './Stat.module.css'
import { useCallback, useEffect, useState } from 'react';
import useHttp from 'hooks/useHttp';

const StatActiveRoutine = () => {

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
            url: "/statistic/messages/routines"
        })
    }, [])
    return (
        <Card className={`${styles.stats}`}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0">Active Routines</h4>
                    </div>
                    <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <ArrowClockwise size={18} />
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
                        <h1 className="fw-bold  text-center">{data.total}</h1>
                        <p className="mb-0 d-flex justify-content-between">
                            <span className={`${styles.sub}`}>One Time</span><span className="text-dark me-2">{data.oneTime}</span>
                        </p>
                        <p className="mb-0 d-flex justify-content-between">
                            <span className={`${styles.sub}`}>Daily</span><span className="text-dark me-2">{data.daily}</span>
                        </p>
                        <p className="mb-0 d-flex justify-content-between">
                            <span className={`${styles.sub}`}>Weekly</span><span className="text-dark me-2">{data.weekly}</span>
                        </p>
                        <p className="mb-0 d-flex justify-content-between">
                            <span className={`${styles.sub}`}>Monthly</span><span className="text-dark me-2">{data.monthly}</span>
                        </p>
                    </div>

                }

            </Card.Body>
        </Card>
    )
}

export default StatActiveRoutine