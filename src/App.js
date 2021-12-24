import React , {useState}  from "react";


import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './components/Home';
import ImageUpload from './components/ImageUpload';
import Error from './components/Error';
import Navigation from './components/Navigation';
import Axios from "axios";


import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
    /*
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
*/

    return (
        <>
        <BrowserRouter>
        <div className="container py-5">
        <Navigation />
        <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/upload" component={ImageUpload} />
        <Route component={Error}/>
        </Switch>
      </div>
      </BrowserRouter>
        </>

        );
}

export default App;
