import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MobileLayout from './components/layout/MobileLayout';

// Page Imports
import Home from './pages/Home';
import Triage from './pages/Triage';
import Scan from './pages/Scan';
import Report from './pages/Report';
import SOS from './pages/SOS';
import Chat from './pages/Chat';
import About from './pages/About'; // ✅ NEW IMPORT

// Disease Select Pages
import NeuroDiseases from './pages/diseases/NeuroDiseases';
import RespiratoryDiseases from "./pages/diseases/RespiratoryDiseases";
import SkinDiseases from "./pages/diseases/SkinDiseases";


function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/triage" element={<Triage />} />

          {/* Disease Flow */}
          <Route path="/diseases/neuro" element={<NeuroDiseases />} />
          <Route path="/diseases/respiratory" element={<RespiratoryDiseases />} />
          <Route path="/diseases/skin" element={<SkinDiseases />} />
          
          {/* Scan */}
          <Route path="/scan/:category" element={<Scan />} />

          {/* Report */}
          <Route path="/report" element={<Report />} />

          {/* AI Chat */}
          <Route path="/chat" element={<Chat />} />

          {/* SOS */}
          <Route path="/sos" element={<SOS />} />

          {/* ✅ ABOUT US PAGE */}
          <Route path="/about" element={<About />} />

          <Route
            path="*"
            element={<div className="p-4 text-center">404 - Not Found</div>}
          />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}

export default App;