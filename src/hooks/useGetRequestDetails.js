import { useEffect, useState } from "react";

const useGetRequestDetails = (url) => {
    const [isLoading, setIsLoading] = useState(null);
    const [request, setRequest] = useState([]);
    const [error, setError] = useState(null);
  
    const getCuttingRequet = async () => {
     
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url, {
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
          setRequest(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      console.log(request);
    }, [request]);
  
    return { getCuttingRequet, request, isLoading, error };
  };
  

export default useGetRequestDetails
