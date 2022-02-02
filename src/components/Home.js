import React , {useState}  from "react";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {
	//let navigate = useNavigate{};
  componentDidMount(){
    document.title = "CyberShare"
  }
  constructor(props) {
    super(props);
    this.state = {value: '',
    message:'',
    uname:'',
    statuss:'',
    cname:'',
    responseMsg: {
      status: "",
      message: "",
      uname: "",
  },
};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    if(event.target.value!=null || event.target.value!=""){
this.setState({message:""});
    }
  }

  handleSubmit(event) {
    const data = new FormData() 
    if(this.state.value==null || this.state.value===""){
      event.preventDefault();
this.setState({statuss:"failed"});
this.setState({responseMsg:{message:"Enter Cyber ID to Continue "},});
    }else{
     event.preventDefault();

     data.append('cyber',this.state.value)

     axios.post("http://localhost:8000/api/cyber", data)
        .then((response) => {
            if (response.status === 200) {
            this.setState({
              uname:response.data.uname,
              responseMsg:{
                message:response.data.message,
              },
              statuss:response.data.status,
              cname:response.data.cname,
            });
            setTimeout(() => {
                this.setState({
                image: "",
                responseMsg: "",
                });
            }, 2000);

            console.log("submitted ");
            //do your task here before redirect
            //...
            if(response.data.status == 'successs')
            {
              this.props.history.push({
                pathname:'/upload',
                state:{cid:this.state.value,uname:response.data.uname,cname:response.data.cname}
               });
            }else{
              this.state.value="";
              this.state.statuss="";
            }
           

           
            }
        })
        .catch((error) => {
            console.error(error);
        });
    
    
 }
  }

  render() {
    return (
      <div className="container py-5">
        <div className="row">
         <div className="card shadow">
      <form onSubmit={this.handleSubmit}>
      <div className="card-header">
       {this.state.statuss=== "failed" ? (
                  <div className="alert alert-danger">
                   {this.state.responseMsg.message}
                  </div>
                ) : (
                  ""
                )}
                  <h4 className="card-title fw-bold">
        
          Cyber ID:
         </h4>
         </div>
         <div className="card-body">
                  <div className="form-group py-2">
          <input  type="number" value={this.state.value} onChange={this.handleChange} />
        

        </div>
                </div>

                <div className="card-footer">
        <input className="btn btn-primary" type="submit" value="Open Tray" />
         </div>
          </form>
              </div>
     
      </div>
      </div>
    );
  }
}

export default Home;

/*
export function NameForm(props) {
  const { value:firstName, bind:bindFirstName, reset:resetFirstName } = useInput('');
  const { value:lastName, bind:bindLastName, reset:resetLastName } = useInput('');
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Submitting Name ${firstName} ${lastName}`);
      resetFirstName();
      resetLastName();
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" {...bindFirstName} />
      </label>
      <label>
        Last Name:
        <input type="text" {...bindLastName} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

import React from 'react';
import {useHistory} from 'react-router-dom';

const Home = () =>{
	let history=useHistory();
	const [formdata,setFormdata]=useState('');

	function handleClick(){
		 history.push({
           pathname: '/upload',
           search: '?query=abc',
           state: { detail: 'some_value' }
       });
	}
	return (
		<div>
		<h1>Home</h1>
		<p>Home page body</p>
		<form onSubmit={handleClick} >
		<input type="text" name="cid" >
		<button type="submit" >
		Upload
		</button>
		</form>
		</div>
		);
}

export default Home;
*/