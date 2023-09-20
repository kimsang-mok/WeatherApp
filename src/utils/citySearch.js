import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
let cancelTokenSource = null;

export async function searchCities(query) {
    // cancel the previous request (if any)
    if (cancelTokenSource) {
        cancelTokenSource.cancel("Request canceled due to new search.");
    }

    cancelTokenSource = axios.CancelToken.source();

    try {
        const response = await axios.get(BASE_URL + `?q=${query}`, {
            cancelToken: cancelTokenSource.token,
        });

        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
        } else {
            console.error("Error fetching data:", error);
        }
    }
}