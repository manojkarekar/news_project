import React, { useState } from 'react'
import "./style.css";

const Navbar = ({onSearchData}) => {
  const [inputValue,setInputValue] = useState('');


  const GetInputData = (event) => {
    setInputValue(event.target.value);
  }

  const handlerSearch = (event)=>{
    event.preventDefault();
    onSearchData(inputValue);
  
  }

  return (
    <nav id='navbar_container' className="navbar navbar-light bg-info" >
      <div className="container-fluid">
        <a className="navbar-brand p-0" > <span >The</span>  Bulletin
        </a>
        <form className="d-flex" id='search'>
          <input className="form-control me-2 " type="search" onChange={GetInputData} placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit" onClick={handlerSearch}>Search</button>
        </form>
      </div>
    </nav>
  )
}  

export default Navbar
