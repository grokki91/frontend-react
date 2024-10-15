const fetchWithAuth = async (url, options, setLogin) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json();
      if (
        errorData.Status === "Error" &&
        errorData.Message === "JWT is already expired"
      ) {
        alert("Your session has expired");
        setLogin(false);
        localStorage.removeItem("token");
        throw new Error("Token expired");
      }
      throw new Error(errorData.Message || "Another error occurred");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default fetchWithAuth;
