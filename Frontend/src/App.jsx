import React from "react";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Main from "./component/Main";

const App = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
};

export default App;