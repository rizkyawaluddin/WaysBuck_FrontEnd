import { Container, } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import React, { useState} from 'react';
// import DummyIncomeTransaction from '../DummyData/IncomeTransaction'
import ModalTransaction from "../components/modal/ModalTransaction";
import Navbar from "../components/Nav/Navbar";
import { API } from "../config/api";

function Transaction() {
    // const [incomeTransaction] = useState(DummyIncomeTransaction)

    const [showTrans, setShowTrans] = useState(false);
    const [idOrder, setIdOrder] = useState(null);

    const handleClose = () => setShowTrans(false);
    const handleShow = (id) => {
    setIdOrder(id);
    setShowTrans(true);
  };

    // Fetching product data from database
    let { data: transactions } = useQuery("transactionsCache", async () => {
        const response = await API.get("/transactions");
        return response.data.data;
    });

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
                        {transactions.map((item,index) => (
                            <tr onClick={() => handleShow(item?.id)}
                            key={index}
                            className={item.status === "" ? "dnone" : ""}>
                            <td>{index + 1}</td>
                            <td>{item?.user.name}</td>
                            <td>{item?.user.profile?.address}</td>
                            <td>{item?.user.profile?.postal_code}</td>
                            <td className="tdPrice">{item?.total}</td>
                            <td className={
                                item.status === 'Success'
                                ? 'statusSuccess'
                                : item.status === 'Cancel'
                                ? 'statusCancel'
                                : item.status === 'Waiting Approve'
                                ? 'statusWaiting'
                                :'statusWay'
                            }> 
                            {item?.status}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <ModalTransaction showTransaction={showTransaction} close={handleClose} id={idOrder}/>
        </Container>
        </>
    )
}

export default Transaction