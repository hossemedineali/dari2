
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";




type porps={
    children:JSX.Element
}

const Layout :React.FC<porps>= (props)=> {
    return ( 
        <div className="rlative">
        <Navbar/>
            {props.children}
        <Footer/>
            
        </div>
        
     );
}
 
export default Layout;