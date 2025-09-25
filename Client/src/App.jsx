import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AppRoutes from "./Routes/AppRoutes";

import { ToastContainer } from "react-toastify"; // ✅ import
import "react-toastify/dist/ReactToastify.css";  // ✅ css import

function App() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />

      {/* ✅ ToastContainer ko global add karein */}
      <ToastContainer
        position="top-right"
        autoClose={2000} // 2 seconds me close hoga
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light" // "dark" bhi use kar sakte ho
      />
    </>
  );
}

export default App;
