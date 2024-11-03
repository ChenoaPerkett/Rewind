import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = { offsetX: 0, offsetY: 0 };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(e) {
    const { innerWidth, innerHeight } = window;
    const offsetX = (e.clientX / innerWidth) * 20 - 10;
    const offsetY = (e.clientY / innerHeight) * 20 - 10;
    this.setState({ offsetX, offsetY });
  }

  render() {
    const { offsetX, offsetY } = this.state;
    return (
      <div
        className="p-4 h-screen bg-blue-900 text-white overflow-hidden relative"
        onMouseMove={this.handleMouseMove}
      >
        <div
          className="absolute bg-blue-700 rounded-full opacity-50 pointer-events-none"
          style={{
            width: '200px',
            height: '200px',
            top: `calc(30% + ${offsetY}px)`,
            left: `calc(10% + ${offsetX}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />

        <div
          className="absolute bg-blue-500 rounded-full opacity-50 pointer-events-none"
          style={{
            width: '150px',
            height: '150px',
            top: `calc(50% - ${offsetY}px)`,
            left: `calc(70% - ${offsetX}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />

        <div
          className="absolute bg-blue-300 rounded-full opacity-50 pointer-events-none"
          style={{
            width: '100px',
            height: '100px',
            top: `calc(80% + ${offsetY}px)`,
            left: `calc(30% + ${offsetX}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />

        <div className='flex relative z-10'>
          <img className="mr-4 h-16 w-16" src="/assets/images/logo.png" alt="rewind logo" />
          <h1 className='text-5xl font-bold'>Rewind</h1>
        </div>

        <main className="flex flex-col items-center h-full justify-center relative z-10">
          <h1 className="text-5xl font-bold">Welcome to Rewind</h1>
          <p className="mt-4 text-2xl text-center max-w-lg">
            Your personal music hub, where you can relive memories through the power of music.
          </p>

          <div className='flex my-4'>
            <Link to='/register'>
              <button className="p-2 mr-4 bg-blue-300 font-bold text-blue-900 rounded-2xl">Get Started</button>
            </Link>

            <Link to='/login'>
              <button className="p-2 bg-white font-bold text-blue-900 rounded-2xl">Login</button>
            </Link>
          </div>

          <p className="text-xl">Your Playlist, Your Memories</p>
        </main>
      </div>
    );
  }
}

export default Splash;