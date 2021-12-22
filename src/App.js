import React , {useState}  from "react";
import "./App.css";
import Images from './components/Images';
import Axios from "axios";


import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
const [imagedata,setImagedata]=useState('');
const [message,setMessage]=useState('');


const handleChange=(file)=>{
setImagedata(file[0]);
    }

    const submitData=(e)=>{
        e.preventDefault();
        const fData=new FormData();

        fData.append('image',imagedata);

        Axios.post('http://127.0.0.1:8000/api/images',fData)
        .then((res) =>{
            if(res.status==200){
                    setMessage(res.data.message);
                
               console.log('response',res.data.message); 
            }
            
        }).catch((e)=>{
            console.error('Faliure',e);
        });
 
    }


    return (
        <>
        
        <div className="container py-5">
        <div className="row">
          <div className="col-xl-6 col-lg-8 col-md-8 col-sm-12 m-auto">
            <form onSubmit={submitData} encType="multipart/form-data" id="imageForm">
              <div className="card shadow">
               {message === "success" ? (
                  <div className="alert alert-success">
                   Image Uploaded Successfully
                  </div>
                ) : message === "nosuccess" ? (
                  <div className="alert alert-danger">
                   Image Not Uploade
                  </div>
                ) : (
                  ""
                )}
                <div className="card-header">
                  <h4 className="card-title fw-bold">
                    Select Files To Share 
                  </h4>
                </div>

                <div className="card-body">
                  <div className="form-group py-2">
                    <label htmlFor="images">Images</label>
                    <input
                      type="file"
                      name="image"                      
                      onChange={e => handleChange(e.target.files)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="card-footer">
                  <button type="submit" onClick={submitData} className="btn btn-success">
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
<Images />
      </div>
        </>

        );
}

export default App;
