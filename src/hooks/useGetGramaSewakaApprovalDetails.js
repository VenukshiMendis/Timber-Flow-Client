import { useEffect, useState } from "react";

const useGetRequestDetails = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [request, setRequest] = useState([]);
    const [error, setError] = useState(null);

    const getCuttingRequest = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
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
        console.log("Request:", request);
        console.log("IsLoading:", isLoading);
    }, [request, isLoading]);

    return { getCuttingRequest, request, isLoading, error };
};

export default useGetRequestDetails;
