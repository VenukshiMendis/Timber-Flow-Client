import { useState } from "react";

const useTimberCuttingRequest = () => {
  const [isLoading, setIsLoading] = useState(null);

  const cuttingRequest = async (FormData) => {
    setIsLoading(true);
  
    const response = await fetch("http://localhost:4000/api/citizen/addTreeCuttingRequest", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormData),
      credentials: 'include'
    });
    await response.json();

    if (!response.ok) {
      setIsLoading(false);
    }
    if (response.ok) {
      setIsLoading(false);
    }
  };

  return { cuttingRequest, isLoading };
};

export default useTimberCuttingRequest
