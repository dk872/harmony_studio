import api from "./api";

const testApi = async () => {
    try {
        const response = await api.get("/services");
        console.log("Services:", response.data);
    } catch (error) {
        console.error("Error fetching services:", error);
    }
};

testApi();
