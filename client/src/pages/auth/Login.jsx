import React from "react";
import Cookies from 'js-cookie';

import Welcome from "./Welcome";
import { Link } from "react-router-dom";
import { login } from "../../services/user";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "",
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            const { token, user } = await login({ email, password });

            Cookies.set('token', token, {
                expires: 7,
                secure: true,
                sameSite: 'strict',
                path: '/'
            });

            Cookies.set('user', JSON.stringify(user), {
                expires: 7,
                secure: true,
                sameSite: 'strict',
                path: '/'
            });

            window.location.href = '/home';
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        const { email, password, error } = this.state;

        return (
            <main className="flex w-full h-screen">
                <div className="w-1/2 h-full">
                    <Welcome />
                </div>

                <section className="w-1/2 h-full p-8 flex flex-col items-center justify-center bg-blue-50">
                    <div className="flex items-center mb-8">
                        <img
                            className="mr-4 h-16 w-16"
                            src="/assets/images/logo.png"
                            alt="rewind logo"
                        />
                        <h1 className="text-5xl font-bold">Rewind</h1>
                    </div>

                    <h1 className="text-3xl font-bold mb-4">Login</h1>
                    <p className="text-lg mb-8">
                        New User?{" "}
                        <Link to="/register">
                            <strong>Create an account</strong>
                        </Link>
                    </p>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form className="mt-4 flex flex-col items-center w-full" onSubmit={this.handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            placeholder="Email"
                            className="w-3/4 p-2 my-2 bg-white text-black rounded"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            placeholder="Password"
                            className="w-3/4 p-2 my-2 bg-white text-black rounded"
                            required
                        />
                        <button className="w-3/4 p-2 my-2 bg-blue-700 hover:bg-blue-800 text-white rounded">
                            Login
                        </button>
                    </form>
                </section>
            </main>
        );
    }
}

export default Login;