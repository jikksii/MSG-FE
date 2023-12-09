import { Card } from 'react-bootstrap';
import { ArrowClockwise, Briefcase } from 'react-bootstrap-icons';
import styles from './Stat.module.css'

const StatActiveRoutine = () => {
    return (
        <Card className={`${styles.stats}`}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0">Active Routines</h4>
                    </div>
                    <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <ArrowClockwise size={18}/>
                    </div>
                </div>
                <div>
                    <h1 className="fw-bold  text-center">129</h1>
                    <p className="mb-0 d-flex justify-content-between">
                        <span className={`${styles.sub}`}>One Time</span><span className="text-dark me-2">2</span>
                    </p>
                    <p className="mb-0 d-flex justify-content-between">
                        <span className={`${styles.sub}`}>Daily</span><span className="text-dark me-2">2</span>
                    </p>
                    <p className="mb-0 d-flex justify-content-between">
                        <span className={`${styles.sub}`}>Weekly</span><span className="text-dark me-2">2</span>
                    </p>
                    <p className="mb-0 d-flex justify-content-between">
                        <span className={`${styles.sub}`}>Monthly</span><span className="text-dark me-2">2</span>
                    </p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default StatActiveRoutine