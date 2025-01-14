import { Home } from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Blogs from './components/Blogs';
import About from './components/About';
import Projects from './components/Projects';
import { Contact } from './components/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;

