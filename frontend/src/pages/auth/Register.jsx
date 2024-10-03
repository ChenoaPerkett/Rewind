import React from "react";
import Welcome from "./Welcome";

class Register extends React.Component {
    render() {
        return (
            <main className="flex w-full h-screen">
                {/* Left half: Welcome section */}
                <div className="w-1/2 h-full">
                    <Welcome />
                </div>

                {/* Right half: Register section */}
                <section className="w-1/2 h-full p-8 flex flex-col items-center justify-center bg-blue-50">
                    <div className='flex items-center mb-8'>
                        <img className="mr-4 h-16 w-16" src="/assets/images/logo.png" alt="rewind logo" />
                        <h1 className='text-5xl font-bold'>Rewind</h1>
                    </div>

                    <h1 className="text-3xl font-bold mb-4">Register</h1>
                    <p className="text-lg mb-8">
                        New User? <strong>Create an account</strong>
                    </p>

                    <form className="mt-4 flex flex-col items-center w-full">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-3/4 p-2 my-2 bg-white text-black rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-3/4 p-2 my-2 bg-white text-black rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-3/4 p-2 my-2 bg-white text-black rounded"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-3/4 p-2 my-2 bg-white text-black rounded"
                        />
                        <button className="w-3/4 p-2 my-2 bg-blue-700 hover:bg-blue-800 text-white rounded">
                            Register
                        </button>
                    </form>
                </section>
            </main>
        );
    }
}

export default Register;
