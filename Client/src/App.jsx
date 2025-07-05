import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <Router>
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
    </Router>
  );
}

export default App;
