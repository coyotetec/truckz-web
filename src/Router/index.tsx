import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MyLoads } from '../view/pages/MyLoads';
import { Sidebar } from '../view/components/Sidebar';
import { AppStyle } from './style';
import { DriversNear } from '../view/pages/DriversNear';
import { Addresses } from '../view/pages/Addresses';
import { Settings } from '../view/pages/Settings';

export function Router() {
  return (
    <BrowserRouter>
      <AppStyle>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/my-loads" />} />
          <Route path="/my-loads" element={<MyLoads />} />
          <Route path="/drivers" element={<DriversNear />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </AppStyle>
    </BrowserRouter>
  );
}
