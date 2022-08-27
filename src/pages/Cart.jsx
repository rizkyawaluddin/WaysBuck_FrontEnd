import React, { useState } from 'react';
import { Container, Col, Button } from "react-bootstrap"
import Rupiah from "rupiah-format";
import { useEffect } from "react";

import CoffeeCart from '../assets/CoffeeCart.svg'
import Bin from '../assets/bin1.svg'
import cartModules from "../assets/styles/cart.module.css"
import ModalCart from "../components/modal/ModalCart"

import ModalPayment from '../components/modal/ModalPayment';
import Navbar from '../components/Nav/Navbar';
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Cart() {

    const [state, dispatch] = useContext(UserContext);
  // modal
    const [showTrans, setShowTrans] = useState(false);
  // const handleShow = () => setShowTrans(true);
    const handleClose = () => setShowTrans(false);
    let navigate = useNavigate();

  // cart
    let { data: cart, refetch } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts-id");
    return response.data.data;
});
console.log(cart)

  // subtotal
    let resultTotal = cart?.reduce((a, b) => {
    return a + b.subtotal;
}, 0);

  // remove
    let handleDelete = async (id) => {
    console.log(id);
    await API.delete(`/cart/` + id);
    refetch();
};

  // pay
    const form = {
    status: "pending",
    total: resultTotal,
};
 console.log(form)
    const handleSubmit = useMutation(async (e) => {
    const config = {
    headers: {
        "Content-type": "application/json",
    },
    };
    // Insert transaction data
    const body = JSON.stringify(form);

    const response = await API.patch("/transaction", body, config);
    console.log(response.data.data.token);

    const token = response.data.data.token;

    window.snap.pay(token, {
        onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
    },
        onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
    },
        onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
    },
        onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
    },
    });
});

    useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "Client key here ...";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
        document.body.removeChild(scriptTag);
    };
}, []);

    return(
        <>
        <Navbar />
      <div className={cartModules.container}>
        <section>
          <p className={cartModules.titlePage}>My Cart</p>
          <p className={cartModules.subtitlePage}>Review Your Order</p>
          <div className={cartModules.wrap}>
            <div className={cartModules.wrap}>
              {/*  */}
              <div className={cartModules.left}>
                {cart?.map((item, index) => (
                  <div className={cartModules.warpProduct} key={index}>
                    <img
                      src={item?.product?.image}
                      className={cartModules.imgProduct}
                      alt="cartimage"
                    />
                    <div className={cartModules.con_wrap}>
                      <span className={cartModules.tex_left}>
                        <p>{item.product.title}</p>
                        <p>{Rupiah.convert(item?.subtotal)}</p>
                      </span>
                      <span className={cartModules.tex_left1}>
                        <p>
                          Toping :{" "}
                          <span>
                            {" "}
                            {item.topping?.map((topping, idx) => (
                              <span className="d-inline" key={idx}>
                                {topping.title},
                              </span>
                            ))}
                          </span>
                        </p>
                        <img
                          src={Bin}
                          onClick={() => handleDelete(item.id)}
                          alt="#"
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={cartModules.right}>
                <div className={cartModules.rightline}>
                  <span>
                    <p>Subtotal</p>
                    <p>{Rupiah.convert(resultTotal)}</p>
                  </span>
                  <span>
                    <p>Qty</p>
                    <p>{cart?.length}</p>
                  </span>
                </div>
                <span className={cartModules.price}>
                  <p>Total</p>
                  <p>{Rupiah.convert(resultTotal)}</p>
                </span>
                <div className={cartModules.btn_grp}>
                  <button type="submit" onClick={(e) => handleSubmit.mutate(e)}>
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ModalCart showTrans={showTrans} close={handleClose} />
        </section>
      </div>
    </>
    )
}

export default Cart