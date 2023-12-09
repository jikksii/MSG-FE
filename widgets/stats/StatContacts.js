import { Card } from 'react-bootstrap';
import { Briefcase, Person } from 'react-bootstrap-icons';
import styles from './Stat.module.css'

const StatContacts = () => {
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
                <div>
                    <h1 className="fw-bold  text-center">129</h1>
                </div>
            </Card.Body>
        </Card>
    )
}

export default StatContacts