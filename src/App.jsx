import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ParticlesBackground from "./components/ParticlesBackground";
import AmbientBlobs from "./components/AmbientBlobs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RouteTransitionOverlay from "./components/RouteTransitionOverlay";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Resume from "./pages/Resume";
import CodingProfiles from "./pages/CodingProfiles";
import Articles from "./pages/Articles";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <RouteTransitionOverlay />
      <AmbientBlobs />
      <ErrorBoundary>
        <ParticlesBackground />
      </ErrorBoundary>
      <div className="noise" />

      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/coding-profiles" element={<CodingProfiles />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}
