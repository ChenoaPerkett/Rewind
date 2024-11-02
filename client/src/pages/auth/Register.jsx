import React from "react";
import Welcome from "./Welcome";
import { Link } from "react-router-dom";
import { signup } from "../../services/auth";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            surname: "",
            password: "",
            confirmPassword: "",
            error: "",
            success: false,
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { name, surname, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            this.setState({ error: "Passwords do not match" });
            return;
        }

        try {
            await signup({ name, surname, email, password });
            this.setState({ success: true, error: "" });
            alert('Registration successful! Please log in.');
            this.props.history.push('/login');
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        const { name, surname, email, password, confirmPassword, error, success } = this.state;

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

                    <h1 className="text-3xl font-bold mb-4">Register</h1>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>Registration successful!</p>}

                    <form className="mt-4 flex flex-col items-center w-full" onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            placeholder="Name"
                            className="w-3/4 p-2 my-2 bg-white text-black rounded"
                            required
                        />
                        <input
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={this.handleChange}
                            placeholder="Surname"
                            className="w-3/4 p-2 my-2 bg-white text-black rounded"
                            required
                        />
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
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={this.handleChange}
                            placeholder="Confirm Password"
                            className="w-3/4 p-2 my-2 bg-white text-black rounded"
                            required
                        />
                        <button className="w-3/4 p-2 my-2 bg-blue-700 hover:bg-blue-800 text-white rounded">
                            Register
                        </button>
                    </form>

                    <br />
                    <p className="text-sm mb-8">
                        Already have an account?{" "}
                        <Link to="/login">
                            <strong>Login</strong>
                        </Link>
                    </p>
                </section>
            </main>
        );
    }
}

export default Register;
