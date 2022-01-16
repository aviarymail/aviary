import { Component, lazy } from 'solid-js';

import { Route, Router, Routes } from 'solid-app-router';
import { Header } from './components/header';

const App: Component = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" component={lazy(() => import('./pages/home'))} />
        <Route path="/login" component={lazy(() => import('./pages/login'))} />
        <Route path="/signup" component={lazy(() => import('./pages/signup'))} />
      </Routes>
    </Router>
  );
};

export default App;
