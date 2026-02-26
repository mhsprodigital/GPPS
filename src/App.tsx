/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Diagnostico } from './pages/Diagnostico';
import { Ferramentas } from './pages/Ferramentas';
import { FerramentasDocumentais } from './pages/FerramentasDocumentais';
import { PlanoAcao } from './pages/PlanoAcao';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="diagnostico" element={<Diagnostico />} />
            <Route path="ferramentas" element={<Ferramentas />} />
            <Route path="ferramentas-documentais" element={<FerramentasDocumentais />} />
            <Route path="plano" element={<PlanoAcao />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
