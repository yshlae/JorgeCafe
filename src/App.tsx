import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { About } from "./components/About";
import { Menu } from "./components/Menu";
import { Order } from "./components/Order";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <About />
      <Menu />
      <Order />
      <Contact />
      <Footer />
    </div>
  );
}