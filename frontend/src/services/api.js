export const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export async function fetchProjects() {
    const response = await fetch(`${API_URL}/api/projects`);
    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`); 
    }
    return response.json(); 
}
export async function fetchExperience() {
    const response = await fetch(`${API_URL}/api/experience`);
    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`); 
    }
    return response.json(); 
}