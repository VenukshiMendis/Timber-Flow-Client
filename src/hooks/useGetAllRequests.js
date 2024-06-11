import { useEffect, useState } from "react";

const useGetAllRequests = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
  
    const getAllRequests = async () => {
      setIsLoading(true);
      setError(null);
    
      try {
        const response = await fetch("http://localhost:4000/api/citizen/allPermitRequests", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
  
        if (!response.ok) {
          const data = await response.json();
          setError(data.error);
        } else {
          const data = await response.json();
          setRequests(data.results);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      console.log(requests); // Log requests after the state has been updated
    }, [requests]);
  
    return { getAllRequests, requests, isLoading, error };
  };
  

export default useGetAllRequests
