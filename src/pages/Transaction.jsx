import { Container, } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import React, { useState} from 'react';
import DummyIncomeTransaction from '../DummyData/IncomeTransaction'
import ModalTransaction from "../components/modal/ModalTransaction";
import Navbar from "../components/Nav/Navbar";

function Transaction() {
    const [incomeTransaction] = useState(DummyIncomeTransaction)

    const [showTransaction, setShowTransaction] = useState(false)
    const handleShow = () => setShowTransaction(true)
    const handleClose = () => setShowTransaction(false)

    return(
        <>
        <Navbar/>
        <Container>
            <div className="mt-3 px-5">
                <h3 className="colorPrimary mb-4">Income Transaction</h3>
                <Table hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Post Code</th>
                            <th>Income</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* MAPPING */}
                        {incomeTransaction.map((item,index) => (
                            <tr key={index} onClick={handleShow}>
                            <td>{item?.no}</td>
                            <td>{item?.name}</td>
                            <td>{item?.address}</td>
                            <td>{item?.postCode}</td>
                            <td className="tdPrice">{item?.income}</td>
                            <td className={
                                item.status === 'Success'
                                ? 'statusSuccess'
                                : item.status === 'Cancel'
                                ? 'statusCancel'
                                : item.status === 'Waiting Approve'
                                ? 'statusWaiting'
                                :'statusWay'
                            }>{item?.status}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <ModalTransaction showTransaction={showTransaction} close={handleClose}/>
        </Container>
        </>
    )
}

export default Transaction