import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL;

export class AuthService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${url}/api/v1/users`,
            withCredentials: true,
        });
    }

    async login(email, password) {
        try {
            return await this.instance.post('/login', { email, password });
        } catch (error) {
            console.error("Login Error", error);
            return null;
        }
    }

    async registerUser(formData) {
        try {
            return await this.instance.post('/register', formData);
        } catch (error) {
            console.error("Register Error", error);
            return null;
        }
    }

    async getCurrentUser() {
        try {
            return await this.instance.get('/current-user');
        } catch (error) {
            console.error("GetCurrentUser Error", error?.message);
            return undefined;
        }
    }

    async logout() {
        try {
            return await this.instance.post('/logout');
        } catch (err) {
            console.error("Logout Error", err);
            return false;
        }
    }

    async changeAvatar(formData) {
        try {
            return await this.instance.patch('/updateavatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        } catch (error) {
            console.error("ChangeAvatar Error", error);
            return null;
        }
    }
}

const Service = new AuthService();
export default Service;