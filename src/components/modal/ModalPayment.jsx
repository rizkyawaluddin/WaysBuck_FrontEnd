import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalPayment({showPayment, close}) {
return (
    <Modal show={showPayment} onHide={close}>
        <div className="p-4">
            <p className="statusSuccess text-center m-2">Thankyou For Ordering in us, please wait to verify you order</p>
        </div>
    </Modal>
)
}
