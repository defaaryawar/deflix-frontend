import { useState, useEffect } from 'react';
import { fetchTMBD } from '../../libs/libsApi'; // Import fungsi API yang lebih generik

const useFetchTMBD = (head, category, item) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchTrendingData = async () => {
            setLoading(true); 
            try {
                const data = await fetchTMBD(head, category.toLowerCase(), item);

                if (isMounted) {
                    setItems(data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching trending data:', error);
                if (isMounted) {
                    setError(`Failed to fetch trending data: ${error.message}`);
                    setLoading(false);
                }
            }
        };

        fetchTrendingData();

        return () => {
            isMounted = false;
        };
    }, [head, category, item]);

    return { items, loading, error };
};

export default useFetchTMBD;
