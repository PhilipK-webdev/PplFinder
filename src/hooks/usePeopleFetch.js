import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (pageNumber) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${pageNumber}`);
    setIsLoading(false);
    let newArrayOfUsers = response.data.results.map(user => {
      // To have indication of the favorites in one single source of truth
      user['isFavorite'] = false;
      return user;
    })
    setUsers(newArrayOfUsers);
  }

  return { users, isLoading, fetchUsers };
};
