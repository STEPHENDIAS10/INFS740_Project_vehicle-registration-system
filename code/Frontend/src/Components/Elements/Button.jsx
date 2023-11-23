import React from "react";

function Button (props) {

    return (
        <button {...props} className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{props.children}</button>
    )

}

export default Button;
