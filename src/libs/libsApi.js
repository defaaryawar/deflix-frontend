export const fetchTMBD = async (head, category, item) => {
    // Jika head kosong atau null, kita tidak mengirimkan bagian tersebut
    const path = head ? `${head}/${category}/${item}` : `${category}/${item}`;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${path}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      if (result && result.results) {
        return result.results;
      } else {
        throw new Error("No 'results' field in response");
      }
  
    } catch (error) {
      console.error(`Error fetching ${head || 'data'}:`, error);
      throw new Error(`Failed to fetch ${head || 'data'}: ${error.message}`);
    }
  };
  