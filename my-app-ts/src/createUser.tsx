import React, { useState } from "react";
import axios from "axios";


interface User {
    user_id: string;
    username: string;
    email: string;
    password: string;
}

const CreateUserForm: React.FC = () => {
    const [user, setUser] = useState<User>({
        user_id: "",
        username: "",
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post("/users", user);
            console.log(response.data);
            setIsLoading(false);
            // ユーザー作成成功の処理
        } catch (error: any) {
            setIsLoading(false);
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("An error occurred.");
            }
        }
    };


    /*
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post("/users", user);
            console.log(response.data);
            setIsLoading(false);
            // ユーザー作成成功の処理
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                const axiosError = error as axios.AxiosError;
                if (axiosError.response && axiosError.response.data && axiosError.response.data.error) {
                    setError(axiosError.response.data.error);
                } else {
                    setError("An error occurred.");
                }
            } else {
                setError("An error occurred.");
            }
        }
    };

     */

    /*
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post("/users", user);
            console.log(response.data);
            setIsLoading(false);
            // ユーザー作成成功の処理
        } catch (error) {
            setIsLoading(false);
            setError(error.response.data.error);
        }
    };

     */

    return (
        <div>
            <h1>Create User</h1>
            {error && <div>Error: {error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create User"}
                </button>
            </form>
        </div>
    );
};

export default CreateUserForm;
