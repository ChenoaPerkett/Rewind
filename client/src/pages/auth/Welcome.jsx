import React, { Component } from 'react';

class Welcome extends Component {
    render() {
        return (
            <section className="p-4 h-screen w-full bg-blue-900 text-white flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold">Welcome to Rewind</h1>
                <p className="mt-4 text-2xl text-center max-w-lg">Create an account to start reliving memories through the power of music.</p>

                <p className="text-xl">Your Playlist, Your Memories</p>
            </section>
        );
    }
}

export default Welcome;