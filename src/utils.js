export async function fetchToken(url, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    console.log("Fetching token", url);
    const ApiResponse = await fetch(url, { ...options, headers });
    console.log("Raw Response:", ApiResponse);
    if (!ApiResponse.ok) {
      const errorData = await ApiResponse.json();
      throw new Error(
        errorData.message || `HTTP error ! status : ${ApiResponse.status}`,
      );
    }
    const jsonData = await ApiResponse.json();
    console.log("Parsed JSON Response:", jsonData);
    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
