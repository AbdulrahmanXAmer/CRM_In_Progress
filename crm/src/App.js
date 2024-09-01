import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSide from './components/signin'; 
import Home from './components/home'; 
import Dashboard from './components/dashboard';
import EmailComponent from './components/email/emails';
import Customers from './components/customers';
import MassMessaging from './components/massMessaging';
import MassEmail from './components/massEmail';
import Notifications from './components/notifications';
import Calendar from './components/calendar';
import ExecutedClients from './components/executed';
import HireVA from './components/hireVA';
import Webinars from './components/webinar';
import Settings from './components/settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/email" element={<EmailComponent />} /> 
        <Route path="/customers" element={<Customers />} />
        <Route path="/massmessaging" element={<MassMessaging />} />
        <Route path="/massemail" element={<MassEmail />} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/executed" element={<ExecutedClients/>} />
        <Route path="/hireVA" element={<HireVA/>} />
        <Route path="/webinar" element={<Webinars/>} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </Router>
  );
}

export default App;
