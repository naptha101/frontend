import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);

  const [users, setUsers] = useState([]);

  // Function to handle form submission
  const sendData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    // Append all selected files to FormData
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await axios.post("https://backend-1-sf76.onrender.com/images-multiple", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
      // Clear form inputs after successful submission
      setName("");
      setEmail("");
      setFiles([]);
      getData();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Function to fetch data from server
  const getData = async () => {
    try {
      const response = await axios.get( "https://backend-1-sf76.onrender.com"+"/users/get");
      console.log("hello");

     console.log(response.data);
      setUsers(response.data); // Assuming response.data is an array of users
      console.log("Fetched data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    //console.log(import.meta.env.TEST_VAR);

    getData();
  }, []);

  // Function to handle file selection
  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };

  // Function to handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    const fileList = Array.from(e.dataTransfer.files);
    setFiles(fileList);
  };

  return (
    <div className='flex flex-col w-full h-full justify-center'>
      <h1 className="text-3xl font-bold bg-yellow-500 text-center py-4">Makes360</h1>
      <div className='container mx-auto'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-4 bg-red-500 p-4'>
            <h2 className="text-xl font-bold mb-2">Current Data</h2>
            <ul>
            {users.map(user => (
                <li key={user._id} className="mb-2">
                  <span className="font-bold">{user.name}</span> - {user.email}
                  {user.Image.map((image, index) => (
                    <img key={index} src={`https://backend-1-sf76.onrender.com/uploads/${image}`} alt={user.name} />
                  ))}
                </li>
              ))}

            </ul>
          </div>
          <div className='col-span-8 bg-red-400 p-4'>
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={sendData} className="flex flex-col gap-4">
              <input type='text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border-2 border-gray-300 p-2 rounded-md" />
              <input type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-gray-300 p-2 rounded-md" />
              <div className="border-2 border-gray-300 p-2 rounded-md" onDragOver={handleDragOver} onDrop={handleDrop}>
                Drop files here or click to select multiple files:
                <input type='file' multiple onChange={handleFileChange} className="hidden" />
              </div>
              {files.length > 0 && (
                <div>
                  <h3>Selected Files:</h3>
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button type='submit' className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">Add User</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
