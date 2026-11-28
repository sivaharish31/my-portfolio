import { SmoothScrollProvider } from "./providers/SmoothScrollProvider";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { OpenSource } from "./components/OpenSource";
import { CompetitiveProgramming } from "./components/CompetitiveProgramming";
import { Certifications } from "./components/Certifications";
import { GitHubActivity } from "./components/GitHubActivity";
import { UnifiedDeveloperIdentity } from "./components/UnifiedDeveloperIdentity";
import { Interests } from "./components/Interests";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";

function App() {
  return (
    <SmoothScrollProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:font-semibold focus:rounded-xl focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <OpenSource />
        <CompetitiveProgramming />
        <Certifications />
        <GitHubActivity />
        <UnifiedDeveloperIdentity />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}

export default App;
