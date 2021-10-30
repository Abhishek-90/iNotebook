import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = () => {
    return (
        <div className="container my-3">
            <AddNote/>
            <h2 className="my-4">View Notes</h2>
            <Notes/>
        </div>
    );
};

export default Home;
