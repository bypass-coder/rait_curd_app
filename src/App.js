import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dept: "",
    age: null,
  });
  const [isUpdateMode,setIsUpdateMode] = useState(false)
  const [message, setMessage] = useState("");
  var [count, setCount] = useState(0);
  const [getAllUsers,setAllUsers] = useState([]);
  const [userId,setUserId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8787/api/v1/user/get-all-users').then((response)=>{setAllUsers(response.data)})
  }, [getAllUsers,formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:8787/api/v1/user/create", formData)
      .then((response) => {
        setMessage("Data saved successfully..");
      })
      .catch((error) => {
        setMessage("error while saving");
      });
  };

  const handleDeleteUser = (id) =>{
    axios.delete(`http://localhost:8787/api/v1/user/${id}`).then((response) => {setMessage("User Deleted Successfully...");}).catch((error) => {setMessage("error while deleting")});
  } 

  const handleFormUpdate = () =>{
    // console.log(userId)
    // console.log(formData)

    axios.put(`http://localhost:8787/api/v1/user/${userId}`,formData).then((response)=>{
      setMessage("User Updated Successfully...")
    }).catch((error) => {setMessage("error while updating")})
  }

  const handleUpdateUser = (id) =>{
    axios.get(`http://localhost:8787/api/v1/user/${id}`).then((response)=>{
      setUserId(response.data._id);
      const {firstName,lastName,dept,age} = response.data;
      setFormData({firstName:firstName,lastName:lastName,dept:dept,age:age})
      setIsUpdateMode(true);
      // console.log(response.data._id);
    }).catch((error) => {setMessage("error while updating")})
  }
  return (
    <div className="App">
      <h1> Curd Application</h1>
      <h3>{message}</h3>
      <h3>Count - {count}</h3>
      <form method="post">
        <label htmlFor="firstName">First name:</label>
        {/* <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="John"
          value={formData._id}
          onChange={handleInputChange}
        /> */}
        <br />
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="John"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="lastName">Last name:</label>
        <br />
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Doe"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="dept">Dept :</label>
        <br />
        <input
          type="text"
          id="dept"
          name="dept"
          placeholder="CSBS"
          value={formData.dept}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="age">Age:</label>
        <br />
        <input
          type="text"
          id="age"
          name="age"
          placeholder="30"
          value={formData.age}
          onChange={handleInputChange}
        />
        <br />
        <br />
        {isUpdateMode ?(
          <button type="button" defaultValue="Update" onClick={handleFormUpdate}>
          Update
        </button>
        ) : (
        <button type="button" defaultValue="Submit" onClick={handleFormSubmit}>
        Submit
      </button> )}
      </form>
      <section>
        <table>
          <tr>
            <th>Sr No</th>
            <th>First Name</th>
            <th>Last name</th>
            <th>Dept</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
          {getAllUsers.map((user,index)=>(
          <tr key={index}>
            <td>{index+1}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.dept}</td>
            <td>{user.age}</td>
            <td>
              <button onClick={()=> handleDeleteUser(user._id)}>Delete</button>
              <button onClick={()=> handleUpdateUser(user._id)}>Update</button>
            </td>
          </tr>
          ))}
        </table>
      </section>
    </div>
  );
}

export default App;
