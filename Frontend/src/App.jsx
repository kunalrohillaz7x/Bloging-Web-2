import React from "react";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Main from "./component/Main";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <Main />
      <Footer />
    </div>
    </AuthProvider>
  );
};

export default App;