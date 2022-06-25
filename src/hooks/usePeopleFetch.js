import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    setIsLoading(false);
    let newArrayOfUsers = response.data.results.map(user => {
      user['boolean'] = false;
      return user;
    })
    setUsers(newArrayOfUsers);
  }

  return { users, isLoading, fetchUsers };
};
