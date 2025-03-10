import axios from "axios";

const API_BASE_URL = "https://starting-pinllfrog-amani-honests-projects.vercel.app";

export const startBackend = async () => {
    try {
        await axios.get(`${API_BASE_URL}/start`);
        return "✅ Backend started!";
    } catch (error) {
        return "❌ Failed to start backend.";
    }
};

export const checkNumbers = async (numbers) => {
    const response = await axios.post(`${API_BASE_URL}/check-numbers`, { numbers });
    return response.data;
};

export const downloadVCF = async (numbers) => {
    const response = await axios.post(`${API_BASE_URL}/download-vcf`, { numbers }, { responseType: "blob" });
    const blob = new Blob([response.data], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.vcf";
    a.click();
};
