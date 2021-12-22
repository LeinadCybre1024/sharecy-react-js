import React, { Component } from 'react';
import axios from 'axios';
import Images from "./Images";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: "",
            responseMsg: {
                status: "",
                message: "",
                error: "",
            },
        };
    } 

    // image onchange hander
    handleChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    // submit handler
    submitHandler = (e) => {
        e.preventDefault();
        const data = new FormData() 
        data.append('images', this.state.image)

        axios.post("http://localhost:8000/api/images", data)
        .then((response) => {
            if (response.status === 200) {
            this.setState({
                responseMsg: {
                status: response.data.status,
                message: response.data.message,
                },
            });
            setTimeout(() => {
                this.setState({
                image: "",
                responseMsg: "",
                });
            }, 2000);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-xl-6 col-lg-8 col-md-8 col-sm-12 m-auto">
            <form onSubmit={this.submitHandler} encType="multipart/form-data" id="imageForm">
              <div className="card shadow">
                {this.state.responseMsg.status === "successs" ? (
                  <div className="alert alert-success">
                    {this.state.responseMsg.message}
                  </div>
                ) : this.state.responseMsg.status === "failed" ? (
                  <div className="alert alert-danger">
                    {this.state.responseMsg.message}
                  </div>
                ) : (
                  ""
                )}
                <div className="card-header">
                  <h4 className="card-title fw-bold">
                    Upload Image in React Using Laravel 8 API
                  </h4>
                </div>

                <div className="card-body">
                  <div className="form-group py-2">
                    <label htmlFor="images">Images</label>
                    <input
                      type="file"
                      name="image"                      
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {this.state.responseMsg.error}
                    </span>
                  </div>
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-success">
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    );
  }
}
/*
import React , {useState}  from "react";
import "./App.css";
import Axios from "axios";

function App(){
const [imagedata,setImagedata]=useState('');


const handleChange=(file)=>{
setImagedata(file[0]);
    }

    const submitData=(e)=>{
        e.preventDefault();
        const fData=new FormData();

        fData.append('image',imagedata);

        Axios.post('http://127.0.0.1:8000/api/images',fData)
        .then((res) =>{
            console.log('response',res);
        }).catch((e)=>{
            console.error('Faliure',e);
        });

    }
    return (
        <>
        <form onSubmit={submitData}> 

<label htmlFor="image">Upload Image to Laravel</label>
<input name="image" id="image" type="file" onChange={e => handleChange(e.target.files)}/>
<button type="submit" onClick={submitData}>upload</button>
        </form>
        </>

        );
}

export default App;
import React from 'react';
import './App.css';
//Success POPUP
import Swal from 'sweetalert2'
//For API Requests
import axios from 'axios';
class App extends React.Component
{
  constructor(props)
  {
    super(props);
    
    this.state = {
      imagedata : String
    };
    this.addFormData = this.addFormData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //FileChange
  handleChange(file)
  {
    this.setState({ 
      imagedata: file[0],
    })
  }
  //Form Submission
  addFormData(evt)
    {
      evt.preventDefault();
      const fd = new FormData();
      
      fd.append('image', this.state.imagedata);
     
      //Post Request to laravel API Route
      axios.post('http://localhost/laravel8/public/api/sample-restful-apis', fd
      ).then(res=>
      {
    this.myFormRef.reset();
    //Success Message in Sweetalert modal
    Swal.fire({
      title: 'Image has been uploaded successfully.',
      text: "Thanks",
      type: 'success',
      
    });
    
    }
    );
    }
  
  
  
  render(Message)
  {
    
    return (
      <div>
       <h1>Therichpost.com</h1>
        <form ref={(el) => this.myFormRef = el}>
               
                
                <label for="image">Image Upload:</label>
                <input onChange={ (e) => this.handleChange(e.target.files) } type="file" id="image" ref="productimage" />
               
                
                <button type="submit" onClick={this.addFormData}>Submit</button>
            </form>
       
        </div>
       
) } }
 export default App;
 */