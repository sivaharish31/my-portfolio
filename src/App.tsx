import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { OpenSource } from "./components/OpenSource";
import { CompetitiveProgramming } from "./components/CompetitiveProgramming";
import { GitHubActivity } from "./components/GitHubActivity";
import { UnifiedDeveloperIdentity } from "./components/UnifiedDeveloperIdentity";
import { Interests } from "./components/Interests";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { CursorSpotlight } from "./components/CursorSpotlight";

function App() {
  return (
    <>
      <ScrollProgress />
      <CursorSpotlight />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <OpenSource />
        <CompetitiveProgramming />
        <GitHubActivity />
        <UnifiedDeveloperIdentity />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
