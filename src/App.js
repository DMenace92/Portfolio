import MainPageComponent from './Components/MainProfolioPage/MainPageComponent'
import AboutInfo from './Components/PersonalInfoContainer/About/AboutInfo';
import Certification from './Components/PersonalInfoContainer/Certification/Certification'
import Projects from './Components/Porjects/ProjectsComponent'
import { Route, Routes } from 'react-router-dom'

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPageComponent />} />
        <Route path="/about" element={<AboutInfo />} />
        <Route path="/certifications" element={<Certification />} />
        <Route path="/projects" element={<Projects />} />

      </Routes>
    </div>
  );
}

export default App;
