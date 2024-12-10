import { useState } from "react";

const useAddGramaSewakaApproval = (url) => {
  const [isLoading, setIsLoading] = useState(null);

  const addApprovalDetails = async (FormData) => {
    setIsLoading(true);
  
    const response = await fetch(url, {
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

  return { addApprovalDetails};
};

export default useAddGramaSewakaApproval