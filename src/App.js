import React, { useState, useEffect } from 'react';

import './style.css'


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=10'); // Fetch 10 users
      const jsonData = await response.json();
  
      const usersWithImages = await Promise.all(jsonData.map(async user => {
        const imageResponse = await fetch(`https://picsum.photos/50?random=${user.id}`);
        const imageUrl = imageResponse.url;
        return { ...user, imageUrl };
      }));
  
      setData(usersWithImages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div>
      <h1>User Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Site</th>
          </tr>
        </thead>
        <hr/>
        <tbody>
  {data.map(user => (
    <tr key={user.id}>
      <td><img src={user.imageUrl} alt={`User ${user.id}`} /></td>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.address.city}</td>
      <td>{user.phone}</td>
      <td>{user.website}</td>
    </tr>
  ))}
</tbody>


        {/* <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
};

export default App;
