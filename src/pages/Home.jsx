import {Card, Container, Row, Col} from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import { useQuery } from 'react-query';
import Rupiah from "rupiah-format";

//init DB
import {API} from "../config/api"

// import DummyDrink from '../DummyData/Drink'
import BannerImg from '../assets/img/Banner.jpg'
import Background from '../components/background/Bg'
import React from 'react';
import Navbar from '../components/Nav/Navbar';

function Home () {
// modal login
const [show, setShow] = useState(false);
const [state] = useContext(UserContext);   // user data
const handleClick = () => setShow(true);
//

// Fetching product data from database
let { data: products } = useQuery('productsCache', async () => {
  const response = await API.get('/products');
  return response.data.data;
});
    return (
        <>
        <Navbar setShow={setShow} show={show}/>
        <Container className='home m-0'>
            <Row>
                <Col className="">
                    <div className=" mt-2">
                        <Card id="card-home" className="mt-5 ">
                            <div className="title-card mt-5 ms-1">
                                <p className="mt-3 ms-5">
                                    WAYSBUCK
                                </p>
                            </div>
                            <div className="content-card ms-3 mt-1 ">
                                <p className="ms-5">
                                Things are changing, but we're still here for you
                                </p>
                            </div>
                            <div className="footer-card ms-5 mt-3">
                                <p className='ms-3'>
                                We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available
                                <br/><br/><span className='colorPrimary fw-bold'>Let's Order...</span>
                                </p>
                            </div>
                                <Background/>
                                <img id="img-main-bg" className="ms-3" src={BannerImg} alt=''/>
                            </Card>
                        </div>
                    </Col>
            </Row>
        </Container>
        <div className='list-card p-5'>
            {/* <CardHome /> */}
            <h1 className='colorPrimary fw-bold'>Let's Order</h1>
            <Row>
                {products?.map((item, index) =>
                    <Col className='mt-4' key={index}>
                    <Link to={
                    state.isLogin === true ? `/detail-product/${item.id}` : ""
                    }
                    onClick={state.isLogin === false ? handleClick : ""}
                    className='text-decoration-none'>
                        <Card style={{width: '15.063rem', border:'0', borderRadius:'10', backgroundColor:'#F6DADA'}}>
                            <Card.Img variant='top' src={item.image} className='rounded' style={{ height: '19.5rem' }} />
                            <Card.Body>
                                <p className='fw-bold text-danger' style={{ fontSize:'18px', margin:'0' }}>{item.title}</p>
                                <p style={{ color:'#974A4A', margin:'0' }}>{Rupiah.convert(item.price)}</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                )}
            </Row>
        </div>
        </>
    )
}

export default Home;