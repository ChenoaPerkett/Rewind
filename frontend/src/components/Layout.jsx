import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

class Layout extends React.Component {
  render() {
    return (
      <div className="flex h-screen">
        <Sidebar />

        
        <div className="flex-grow">
          <Header />

          
          <div className="p-6 bg-gray-100 ">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Layout;


