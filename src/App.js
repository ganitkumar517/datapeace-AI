import { React, useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState("");
  const [modeldata,setModeldata] = useState({
    id:'',
    first_name:'',
    last_name:'',
    age:'',
    email:'',
    web:''
 })
  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
      )
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setSearchApiData(json);
        });
    };
    fetchData();
  }, []);
 
  const showDetail = (id) =>
    {
      
      const a=fetch("https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json/${id}")
      .then(resposne=> resposne.json())
      .then(res=>setModeldata(res))
      
    }
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.first_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.last_name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([{ first_name: "No Recode Found" }]);
      }
    }
    setFilterVal(e.target.value);
  };
  return (
    <div className="App">
    <section id="one" >
      <h1>User</h1>
      <div className="p-input-icon-right">
        <input
          type="search"
          placeholder="Search by first or last name"
          value={filterVal}
          onInput={(e) => handleFilter(e)}
        />
      </div>
      <table>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Website</th>
        <th>details</th>
        {data.map((item) => {
          return (
            <>
            <tr>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
              <td>{item.web}</td>
              <td><button class="btn btn-primary" onClick={(e)=>showDetail(item.id)} >Details</button></td>
            </tr>
           
          </>
          );
        })}
      </table>
    </section> 
    <div class="modal" id="myModal">
        <div class="modal-dialog" style={{width:"700px"}}>
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">ID No : {modeldata.id}</h4>
          
            </div>
             
            <div class="modal-body">
            <table class="table table-striped table-sm">
                        <thead class="thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>age</th>
                                <th>Email</th>
                                <th>Website</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                           <tr >
                              <td>{modeldata.id}</td>
                              <td>{modeldata.first_name}</td>
                              <td>{modeldata.last_name}</td>
                              <td>{modeldata.email}</td>
                              <td>{modeldata.website}</td>
                               
                           </tr>
                          
                        </tbody>
                    </table>
            </div>
             
             
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
             
          </div>
        </div>
      </div>
    </div>
  );
}
