import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MyLoads } from '../view/pages/MyLoads';
import { DriversNear } from '../view/pages/DriversNear';
import { Addresses } from '../view/pages/Addresses';
import { AppLayout } from '../view/layouts/AppLayout';
import { SettingsLayout } from '../view/layouts/SettingsLayout';
import { ContractorData } from '../view/pages/Settings/ContractorData';
import { UserData } from '../view/pages/Settings/UserData';
import { Login } from '../view/pages/Login';
import { ContractorSignUp } from '../view/pages/ContractorSignUp';
import { AuthGuard } from './AuthGuard';
import { NewLoad } from '../view/pages/NewLoad';
import { NewAddress } from '../view/pages/NewAddress';
import { UpdateAddress } from '../view/pages/UpdateAddress';
import { UpdateLoad } from '../view/pages/UpdateLoad';
import { DriverSignUp } from '../view/pages/DriverSignUp';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up/contractor" element={<ContractorSignUp />} />
          <Route path="/sign-up/driver" element={<DriverSignUp />} />
        </Route>

        <Route element={<AuthGuard isPrivate={true} />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/loads" />} />
            <Route path="/loads" element={<MyLoads />} />
            <Route path="/loads/new" element={<NewLoad />} />
            <Route path="/loads/update/:id" element={<UpdateLoad />} />
            <Route path="/drivers" element={<DriversNear />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="addresses/new" element={<NewAddress />} />
            <Route path="addresses/update/:id" element={<UpdateAddress />} />
            <Route element={<SettingsLayout />}>
              <Route
                path="/settings"
                element={<Navigate to="/settings/user-data" />}
              />
              <Route path="/settings/user-data" element={<UserData />} />
              <Route
                path="/settings/contractor-data"
                element={<ContractorData />}
              />
              R
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
