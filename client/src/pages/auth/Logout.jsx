import React from 'react';
import Cookies from 'js-cookie';

class Logout extends React.Component {
    handleLogout = () => {
        Cookies.remove('token', { path: '/' });
        Cookies.remove('user', { path: '/' });
        window.location.href = '/login';
    };

    handleCancel = () => {
        window.history.back();
    };

    render() {
        return (
            <main className="flex items-center justify-center h-screen bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-2xl font-bold mb-6">Are you sure you want to logout?</h1>

                    <div className="space-x-4">
                        <button
                            onClick={this.handleCancel}
                            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={this.handleLogout}
                            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </main>
        );
    }
}

export default Logout;