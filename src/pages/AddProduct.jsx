//depedencies
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import React, { useState } from "react";
import { useMutation } from "react-query";

//api config
import { API } from "../config/api";

//component
import FileImg from '../assets/img/icon-upload.png'
import Navbar from '../components/Nav/Navbar';


const AddProduct = () => {

    // const [product, setProduct] = useState({});

    const [previewName, setPreviewName] = useState(""); //name
  const [preview, setPreview] = useState(null); //image

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
  }); //Store product data

  //handle chahnge data on from
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPreviewName(e.target.files[0].name);
    }
  };

  let navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("price", form.price);

      // Insert category data
      const response = await API.post('/product', formData, config);
      console.log(response);


      navigate("/transaction");
    } catch (error) {
      console.log(error);
    }
  });
// const [preview, setPreview] = useState(null);
// const [previewName, setPreviewName] = useState("");

// const handleChange = (e) => {
//     setProduct({
//         ...product,
//         [e.target.name]: e.target.value,
//     });

//     if (e.target.type === "file") {
//         let url = URL.createObjectURL(e.target.files[0]);
//         setPreview(url);
//         setPreviewName(e.target.files[0].name);
//     }
// };

// let navigate = useNavigate();

//     const handleSubmit = (e) => {
//     e.prevent.default();
//     navigate("/transaction")
// };
    return (
        <>
        <Navbar/>
        <div className=" container d-flex justify-content-center mt-3 align-items-center" id="add-product">
            <div className="left-side col-7">
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div className="tx-product mt-5 mb-5">
                    <h1>Product</h1>
                </div>
                <Form.Group className="mb-3">
                    <Form.Control
                        id="input"
                        type="text"
                        name="title"
                        placeholder="Name Product"
                        className='input'
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                        id="input"
                        type="number"
                        name="price"
                        placeholder="Price"
                        className='input'
                        onChange={handleChange}
                        />
                    </Form.Group>
                    <input
                        type="file"
                        id="addProductImage"
                        hidden
                        className="photoProduct"
                        name="image"
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="addProductImage"
                        className={previewName === "" ? "addProductImage" : "previewName"}
                        >
                        {previewName === "" ? "Photo Product" : previewName}
                        <img src={FileImg} alt="paperClip" />
                    </label>
                    <div className="d-grid gap-2">
                        <Button type='submit' className="btn-product mx-auto">
                        Add Product
                        </Button>
                    </div>
                </Form>
            </div>
                    {preview && (
                    <div className="addProductRight">
                        <img src={preview} alt="preview" className='mt-5'/>
                    </div>
                    )}
        </div>
        </>
    )
}

export default AddProduct;
