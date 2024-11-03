import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

class Layout extends React.Component {
  render() {
    return (
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-grow">
          <div className="p-6 h-screen bg-blue-200">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Layout;


