import React from 'react'
import {Container, Row, Card} from 'react-bootstrap'
import ProfileImg from '../assets/profile.svg'
import CoffeeTransaction from '../assets/coffeeTransaction.svg'
import Logo from '../assets/logo.svg'
import QRCode from 'react-qr-code'
import Navbar from '../components/Nav/Navbar'

export default function Profile() {
    return (
        <>
        <Navbar/>
            <Container className='p-5'>
            <div className='myProfileContainer'>
                <div>
                    <h4 className='colorPrimary mb-4'>My Profile</h4>
                    <div className='cardProfile'>
                        <div className='me-4'>
                                <Card.Img src={ProfileImg} style={{ width: '12rem' }} />
                        </div>
                        <div>
                            <div>
                                <h6>Full Name</h6>
                                <p>Budi Genteng</p>
                            </div>
                            <div>
                                <h6>Email</h6>
                                <p>budi@mail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className='colorPrimary mb-4 color4'>My Transaction</h4>
                    <div className='color3 cardTransaction'>
                        <div className='childCardTransaction'>
                            <div>
                                <div className='d-flex'>
                                    <div className='me-2'>
                                        <img src={CoffeeTransaction} alt="coffee"/>
                                    </div>
                                    <div>
                                        <div>
                                            <h5 className='f14 colorPrimary fw-bold'>Ice Coffe Palm Sugar</h5>
                                            <p className='f9 colorPrimary'><span className='fw-bold'>Saturday</span>, 5 March 2020</p>
                                        </div>
                                        <div>
                                            <h6 className='f10 colorPrimary'><span className='colorSecondary'>Toping</span> : Bill Berry Boba, Bubble Tea Gelatin</h6>
                                            <p className='f10 colorSecondary'>Price : Rp.33.000</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div className='me-2'>
                                        <img src={CoffeeTransaction} alt="coffee"/>
                                    </div>
                                    <div>
                                        <div>
                                            <h5 className='f14 colorPrimary fw-bold'>Ice Coffe Palm Sugar</h5>
                                            <p className='f9 colorPrimary'><span className='fw-bold'>Saturday</span>, 5 March 2020</p>
                                        </div>
                                        <div>
                                            <h6 className='f10 colorPrimary'><span className='colorSecondary'>Toping</span> : Bill Berry Boba, Bubble Tea Gelatin</h6>
                                            <p className='f10 colorSecondary'>Price : Rp.33.000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='statusCardTransaction'>
                                <div className='mb-4'>
                                    <img src={Logo} alt="logo" width='48px'/>
                                </div>
                                <div className='mb-2'>
                                    <QRCode value='test' bgColor='transparent' size={74}/>
                                </div>
                                <span className='bgStatusBlue mb-2'>
                                    <p className='fColorBlue f10'>On The Way</p>
                                </span>
                                <div>
                                    <h6 className='fw-bold f10 colorSecondary'>Sub Total : 69.000</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
        </>
    )
}
