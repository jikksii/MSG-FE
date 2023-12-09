import { Card } from 'react-bootstrap';
import { Briefcase } from 'react-bootstrap-icons';
import styles from './Stat.module.css'

const StatTotalMessages = () => {
    return (
        <Card className={`${styles.stats}`}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0">Total Messages</h4>
                    </div>
                    <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <Briefcase size={18}/>
                    </div>
                </div>
                <div>
                    <h1 className="fw-bold text-center">129</h1>
                    <div className="mb-0 d-flex w-100 justify-content-between">
                        <span cla className={`${styles.sub} col-1`}>Successful</span><span className="text-dark me-2">2</span>
                    </div>
                    <p className="mb-0 d-flex justify-content-between">
                        <span className={`${styles.sub}`}>Pending</span><span className="text-dark me-2">2</span>
                    </p>
                    <p className="mb-0 d-flex justify-content-between">
                        <span className={`${styles.sub}`}>Failed</span><span className="text-dark me-2">2</span>
                    </p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default StatTotalMessages