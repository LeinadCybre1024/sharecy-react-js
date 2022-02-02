import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import plogo from '../assets/pdficon.png';
import dlogo from '../assets/docicon.png';
import ilogo from '../assets/pngicon.png';
import { Button } from "react-bootstrap";

export default class Images extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      logo:'',
      uname:'',
    };
  }

  componentDidMount() {
    this.getImages();
  }

  removeItem = (id) => {

  }
 
  getImages = (uname) => {
    axios
      .get("http://localhost:8000/api/files",['uname',uname])
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            images: response.data.data,
          });

          console.log(this.uname);

          console.log(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="container pt-4">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 m-auto">
            <div className="card shadow">
              <div className="card-header">
                <h4 className="card-title fw-bold"> My Tray  </h4>
              </div>
              <div className="card-body">
                <div className="row">

                  {
                    this.state.images.length > 0 ? (
                        this.state.images.map((image) => (
                          
                        <div id={image.id} className="col-xl-4 col-lg-4 col-sm-4 col-4 mt-3" key={image.id}>
                            
                            
                            <img src=
                              {
                                image.ext=='pdf' ? plogo 
                                :image.ext=='png' ? ilogo
                                :image.ext=='doc' ? dlogo
                                : (
                                  ""
                                )}
                             className="img1" width="200px"
                           alt="Images" height={"50px"} width={"50px"}/>
                           <p>{image.cfileName+"."+image.ext}</p>
                           <ul className="list-inline"> 
                             <li><button onKeyPress={this.removeItem((image.id))} className="btn btn-warning" id={image.id}>Remove</button> </li>
                           </ul>
                        </div>
                        ))
                    ) : (
                        <h6 className="text-danger text-center">No Files  Found </h6>
                    )
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/*
row = this.props.cells.map(function(cell, i) {

        if(cell.URL != null && cell.URL.length > 0){
            return <td className={cell.Meta.HTMLClass} key={i}>{cell.Text}</td>;        
        }
        else {
            return <td className={cell.Meta.HTMLClass} key={i}>{cell.Text}</td>;
        }

    }.bind(this));
    */