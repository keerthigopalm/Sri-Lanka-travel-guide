import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Navbar />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
