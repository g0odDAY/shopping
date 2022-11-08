import React from "react";
import Loader from "react-spinners/BarLoader";

const Loading = () => {
    return (
        <div className="contentWrap">
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <Loader
                    color="#36d7b7"
                />
            </div>
        </div>
    );
}

export default Loading;