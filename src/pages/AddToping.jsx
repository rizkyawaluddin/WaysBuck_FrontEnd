import  React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';

import FileImg from '../assets/img/icon-upload.png'
import Navbar from '../components/Nav/Navbar';

import { API } from "../config/api";
import { useMutation } from "react-query";

const AddToping = () => {
    const [preview, setPreview] = useState(null);
    const [previewName, setPreviewName] = useState("");
    console.log(previewName);
    // const [form,setFrom]
  
    // Create variabel for store data with useState here ...
    const [form, setform] = useState({
      image: "",
      title: "",
      price: "",
    }); //Store product data

    //handle chahnge data on from
    const handleChange = (e) => {
      setform({
        ...form,
        [e.target.name]:
          e.target.type === "file" ? e.target.files : e.target.value,
      });
  
      // Create image url for preview
      console.log(e.target.files);
      if (e.target.type === "file") {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
        setPreviewName(e.target.files[0].name);
      }
    };
    console.log(form);
  
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
        const response = await API.post("/topping", formData, config);
        console.log(response);

        navigate("/transaction");
        } catch (error) {
            console.log(error);
        }
    });
    return (
        <>
        <Navbar/>
        <div className="d-flex justify-content-center">
        <div className="addProduct container d-flex justify-content-center" id="add-product">
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="left-side col-7">
                <div className="tx-product mt-5 mb-5">
                    <h1>Toping</h1>
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
                        {previewName === "" ? "Photo Toping" : previewName}
                        <img src={FileImg} alt="paperClip" />
                    </label>
                    <div className="d-grid gap-2">
                        <Button className="btn-product mx-auto" type='submit'>
                        Add Toping
                        </Button>
                </div>
            </div>
            </Form>
            {preview && (
            <div className="addProductRight">
                <img src={preview} alt="preview" />
            </div>
            )}
        </div>
        </div>
        </>
    )
}

export default AddToping;


