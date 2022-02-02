import React, { Component } from 'react';
import axios from 'axios';
import Images from "./Images";
import { useLocation ,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseURL="http://localhost:8000/api/files";

export default class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
          cid:props.location.state.cid,
          uname:props.location.state.uname,
            image: "",
            fname:'',
            value:'',
            cname:props.location.state.cname,
            responseMsg: {
                status: "",
                message: "",
                error: "",
            },
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    } 

    componentDidMount() {
    this.getCid();
  }
 
  getCid = () => {
   // alert(this.state.cid);
    if(this.state.cid==null || this.state.cid===""){
      this.props.history.push('/');
    }
  };
 
    // image onchange hander
    handleChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    } 
//filename onchange handler
handleChange2 = (e) => {
  this.setState({value: e.target.value});
  
} 
        


    // submit handler
    submitHandler = (e) => {
        e.preventDefault();

        const formel=document.querySelector("form");



        let data = new FormData(formel) 
        data.append('file', this.state.image)
        data.append('cid',this.state.cid)
        data.append('uname',this.state.uname)
        data.append('fname',this.state.value)

        axios.post(baseURL, data)
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

            document.querySelector("#imageForm").reset();
            // getting uploaded images
            this.refs.child.getImages(this.state.uname);
            }
            this.setState({
              value:''
            })
            console.log(response.data.message);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 m-auto">
            <form onSubmit={this.submitHandler} encType="multipart/form-data" id="imageForm">
              <div className="card shadow">
            
                {this.state.status === "successs" ? (
                  <div className="alert alert-success">
                    {this.state.message}
                  </div>
                ) : this.state.status === "failed" ? (
                  <div className="alert alert-danger">
                    {this.state.message + '-'+this.state.status}
                  </div>
                ) : (
                  ""
                )}
                <div className="card-header">
                  <h4 className="card-title fw-bold">
                    CyberName : {this.state.cname}
                  </h4>
                  
                  <h4 className="card-title fw-bold">
                    Uname : {this.state.uname}
                  </h4>
                </div>

                <div className="card-body">
                  <div className="form-group py-2">
                    <label htmlFor="images">Upload Your Files Here:</label>
                    <input
                      type="file"
                      name="file"                      
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    <br/>
                    <label>Filename</label><br/>
                    <input type="text"
                    name="fname"
                    value={this.state.value}
                    onChange={this.handleChange2}
                    className="form-control"
                    />
                    <span className="text-danger">
                      {this.state.error}
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
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 m-auto">
          <Images ref='child'/>
          </div>
        </div>
      </div>
    );
  }
}
/*
import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ImageUpload from './components/ImageUpload';

class App extends Component {
    render() {
        return (
            <Router>
                  <Switch>
                      <Route path="/upload-image" component={ ImageUpload }/>
                  </Switch>
            </Router>
        );
    }
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