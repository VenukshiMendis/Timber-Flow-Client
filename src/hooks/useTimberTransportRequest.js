import { useState } from "react";

const useTimberTransportRequest = () => {
  const [isLoading, setIsLoading] = useState(null);

  const transportRequest = async (FormData) => {
    setIsLoading(true);
  
    const response = await fetch("http://localhost:4000/api/citizen/addTimberTransportRequest", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormData)
    });
    await response.json();

    if (!response.ok) {
      setIsLoading(false);
    }
    if (response.ok) {
      setIsLoading(false);
    }
  };

  return { transportRequest, isLoading };
};

export default useTimberTransportRequest
