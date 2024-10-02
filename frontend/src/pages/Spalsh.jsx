import React, { Component } from 'react';

class Spalsh extends Component {
  render() {
    return (
      <div className="p-4 h-screen bg-blue-900 text-white">
        <div className='flex'>
          <img className="mr-4 h-16 w-16" src="/assets/images/logo.png" alt="rewind logo" />
          <h1 className='text-5xl font-bold'>Rewind</h1>
        </div>

        <main className="flex flex-col items-center h-full justify-center">
          <h1 className="text-5xl font-bold">Welcome to Rewind</h1>
          <p className="mt-4 text-2xl text-center max-w-lg">Your personal music hub, where you can relive memories through the power of music.</p>

          <div className='flex my-4'>
            <button className="p-2 mr-4 bg-blue-300 font-bold text-blue-900 rounded-2xl">Get Started</button>
            <button className="p-2 bg-white font-bold text-blue-900 rounded-2xl">Login</button>
          </div>

          <p className="text-xl">Your Playlist, Your Memories</p>
        </main>
      </div>
    );
  }
}

export default Spalsh;
