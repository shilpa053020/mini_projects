import React, { useState,useEffect} from 'react';
import Select from "react-select";
import axios from "axios"
import "./app.css"
const CustomDropdown = () => {
  const [data, setData] = useState([]);
  const [selectOption, setSelectOption] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [msg,setmsg] = useState("");
 

const handlechange = (selectedOption) => {
    setSelectOption(selectedOption);
    setmsg(`YOU HAVE SELECTED :${selectedOption.label}`)

   
   
};
const customFilterOption = (option, rawInput) => {
    const lowercaseLabel = option.label.toLowerCase();
    const lowercaseInput = rawInput.toLowerCase();
  
    return lowercaseLabel.startsWith(lowercaseInput);
  };
  
  
const handleInputChange = (inputValue) => {
    if (inputValue) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  };
  useEffect(() =>{
    console.log("use effect");
    getAll();
  },[])
  
  
  const getAll = async () => {
    try {
      const response = await axios.get("http://localhost:5000/option/get");
      const options = response.data.map((item) => ({
        value: item.id, // replace with your unique identifier from the database
        label: item.country,
      }));
      console.log("options",options);
      setData(options);
      console.log("after set to state variable:",data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="custom-dropdown">
      <h1>Custom_Dropdown</h1>
      <Select
        options={data}
        value={selectOption}
        onChange={handlechange}
        onInputChange={handleInputChange}
        menuIsOpen={isMenuOpen}
        placeholder="SEARCH BY COUNTRY NAME"
        filterOption={customFilterOption}
      />
       <p>{msg}</p>
      </div>
    
    
  );
};

export default CustomDropdown;
