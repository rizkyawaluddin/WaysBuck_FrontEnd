import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import Navbar from 'react-bootstrap/Navbar'
import { useEffect } from "react";
import { API } from "../../config/api";
import { useState } from "react";
import { useQuery } from "react-query";

import ModalAuth from '../auth/ModalAuth'
import Dropdowns from '../Nav/Dropdowns'

import Logo from '../../assets/logo.svg'
import Basket from '../../assets/basket.svg'


export default function Navbarr({setShow, show}) {
    const [state] = useContext(UserContext)
    const isLogin = state.isLogin

    let { data: cart } = useQuery("cartsCache", async () => {
        const response = await API.get("/carts-id");
        return response.data.data;
    });
return (
    <Navbar className="d-flex justify-content-between px-5">
        <div>
            <Link to={'/'}>
                <img src={Logo} alt="logo" className='navabarLogo'/>
            </Link>
        </div>
        {isLogin ? (
        <div className='navbarRight'>
            <div className={
                cart === undefined
                ? 'd-none'
                : cart?.length === 0
                ? 'd-none'
                : 'circle'
                }
                >
                {cart?.length}
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                <Link to={'/cart'}>
                    <img src={Basket} alt="cart" className='navbarCart'/>
                </Link>
                </div>
                <div className='ms-2'>
                    <Dropdowns/>
                </div>
            </div>
        </div>
        ) : (
            <div className='navbarRight'>
                <ModalAuth />
            </div>
    )}
    </Navbar>
)
}
