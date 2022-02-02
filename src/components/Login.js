
import React , {useState}  from "react";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uname: '',
        password:'',
        message:'',
      };
      this.changeUname = this.changeUname.bind(this);
      this.changePass = this.changePass.bind(this);
      this.submit = this.submit.bind(this);
    }

    changeUname(event) {
        this.setState({uname: event.target.value});
        if(event.target.value!==null || event.target.value!==""){
    this.setState({message:""});
        }
      }

      changePass(event) {
        this.setState({password: event.target.value});
        if(event.target.value!=null || event.target.value!=""){
    this.setState({message:""});
        }
      }
    
    submit = (event) => {

        event.preventDefault();

        /*
        Simple debbugger
        alert('Hello'+this.state.uname);
        alert('Hello'+this.state.password);
        */

        const formel=document.querySelector("form");



        let data = new FormData(formel) 
        data.append('uname',this.state.uname)
        data.append('pass',this.state.password)

        axios.post("http://localhost:8000/api/cylogin",data)
        .then((response) => {
            if(response.status === 200){
                this.setState({
                    message:response.data.message,
                });
                setTimeout(() => {
                    this.setState({
                        message:''
                    })
                },2000);


            }
            if(response.data.status == 'success')
            {
              this.props.history.push({
                pathname:'/dash',
                state:{uname:this.state.uname}
               });
            }else{
             this.setState({
                 uname:'',
                 password:''
             })
             alert(response.data.status);
            }
            
         })
        .catch((error) => {
            console.error(error);
        });
    }

    
    
    render() {
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className='card'>
                                <div className='card=header bg-success text-white'>
                                    <p className='h4'>Login Herer</p>
                                </div>
                                <form onSubmit={this.submit}>
                                    <div className='mb-3 mg'>
                                        <input type='text' value={this.state.uname} onChange={this.changeUname} className='form-control' placeholder='Username'/>
                                    </div>
                                    <div className='mb-3'>
                                        <input type='password' value={this.state.password} onChange={this.changePass} className='form-control' placeholder='Password'/>
                                    </div>
                                    <div className='mb-3'>
                                        <input type='submit' className='btn btn-primary'    value='Submit' placeholder='Username'/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;