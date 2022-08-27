import Rupiah from "rupiah-format";
import { Container, Row, Col } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import { API } from "../config/api";
import Navbar from "../components/Nav/Navbar"
import CheckToping from '../assets/checkToping.svg'




function DetailProduct() {
    const navigate = useNavigate();
    // check
    const [show, setShow] = useState(false);

    const handleCheck = () => {
      if (show === false) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
  
    // toping
    const [toping, setToping] = useState([]);
    const [topping_id, setIdToping] = useState([]);
  
    const handleChange = (e) => {
      let updateToping = [...toping];
      if (e.target.checked) {
        updateToping = [...toping, e.target.value];
      } else {
        updateToping.splice(toping.indexOf(e.target.value));
      }
      setToping(updateToping);
  
      let toppingId = [...topping_id];
      if (e.target.checked) {
        toppingId = [...topping_id, parseInt(e.target.id)];
      } else {
        toppingId.splice(topping_id.indexOf(e.target.id));
      }
  
      setIdToping(toppingId);
    };
  
    // fatching
    let { id } = useParams();
    let { data: product } = useQuery("productCache", async () => {
      const response = await API.get("/product/" + id);
      return response.data.data;
    });
  
    let { data: toppings } = useQuery("toppingsCache", async () => {
      const response = await API.get("/toppings");
      return response.data.data;
    });
  
    // price sum
    let resultTotal = toping.reduce((a, b) => {
      return a + parseInt(b);
    }, 0);
  
    let subtotal = product?.price + resultTotal;
    let qty = 1;
  
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const body = JSON.stringify({
          topping_id: topping_id,
          subtotal: subtotal,
          product_id: parseInt(id),
          qty: qty,
        });
  
        console.log("a");
  
        const response = await API.post("/cart", body, config);
        console.log("====================================");
        console.log(response);
        console.log("====================================");
  
        // navigate("/");
      } catch (error) {
        console.log(error);
      }
    });
//     const params = useParams()
//     const data = DummyDrink[parseInt(params.id - 1)]
//     const [topping] = useState(DummyTopping)

//     //check
//     const [show, setShow] = useState(false)
//     const handleCheck = () =>{
//         if(show === false){
//             setShow(true)
//         }else{
//             setShow(false)
//         }
//     }

//     const [toping, setToping] = useState([])
//     console.log(toping);
//     const handleOnChange = (e) => {
//         let updateToping = [...toping]
//         if(e.target.checked){
//             updateToping = [...toping, e.target.value ]
//         }else{
//             updateToping.splice(...toping.indexOf(e.target.value))
//         }
//         setToping(updateToping)
//     }

//     const [counter, setCounter] = useState(0)
//     console.log(counter)
//     const handleSubmit = (e) =>{
//         e.preventDefault()
//         setCounter(counter + 1)
//     }

//     // tambah price
//   let resultTotal = toping.reduce((a, b) => {
//     return a + parseInt(b);
//   }, 0);

    return (
        <>
        <Navbar/>
        <Container className="detailProductContainer">
            <div className="me-5">
                <Card.Img src={product?.image} style={{ width: '24rem' }} />
            </div>
            <div>
                <div className="mb-5">
                    <h1 className='colorPrimary fw-bold'>{product?.title}</h1>
                    <h5 className='colorSecondary fw-bold'>{Rupiah.convert(product?.price)}</h5>
                </div>
                <div className="mb-3">
                    <h5 className='colorSecondary fw-bold mb-3'>Toping</h5>
                    {/* MAPPING */}
                    <Row>
                    {toppings?.map((item, index) => (
                        <div key={index} className="topping-datas ms-4 col d-flex">
                            <label htmlFor={item?.id} className='checkContainer'>
                                <input
                                type="checkbox"
                                id={item?.id}
                                onChange={handleChange}
                                value={item?.price}
                                name='toping'
                                className="checkInput"
                                />
                                <img
                                src={CheckToping}
                                alt="check"
                                className="checkMark"
                                />
                                <img src={item?.image}
                                alt=""
                                onClick={handleCheck}
                                htmlFor={item?.id}
                                width='60'
                                className="align-item-center"
                                />
                            </label>
                            <p className="colorPrimary f12 text-center">{item?.title.substring(0, 17)}</p>
                        </div>
                    ))}
                    </Row>
                    {/* END MAPPING */}
                </div>
                <div className='totalDetailProduct'>
                    <h4 className='colorSecondary fw-bold'>Total</h4>
                    <h4 className='colorSecondary fw-bold'>{Rupiah.convert(product?.price + resultTotal)}</h4>
                </div>
                <div><Button className='btnAddToCart bgColorPrimary' onClick={(e) => handleSubmit.mutate(e)}>Add To Cart</Button>{' '}</div>
            </div>
        </Container>
        </>
    )
}

export default DetailProduct