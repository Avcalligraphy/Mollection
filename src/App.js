import React, { useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import Login from './pages/Auth/Login'
import ScreenTransition from './components/ScreenTransition'
import Home from './pages/Home'
import Maps from './pages/Maps'
import Friends from './pages/Friends'
import Profile from './pages/Profile'
import Notifcations from './pages/Notifcations'
import PrayPage from './pages/PrayPage'
import SplashScreen from './pages/SplashScreen'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { auth } from './Database/Fire'
import { onAuthStateChanged } from 'firebase/auth'
import Register from './pages/Auth/Register'
import { ChartDataProvider } from './Redux/ChartDataContext'
import axios from 'axios'

const App = () => {
  const [loginTime, setLoginTime] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusToggle, setStatusToggle] = useState();
  const [dataBlynk, setDataBlynk] = useState("");
  const [dataBill, setDataBill] = useState();
  useEffect(() => {
    // Fungsi yang akan dijalankan untuk mengambil data
    const fetchDataBlynk = async () => {
      // console.log("coba", device)
      try {
        const apiUrlStatusToggle = `https://blynk.cloud/external/api/get?token=Nj_x0XR_IHVM8AcfZcXi71dugmPFBou2&v11`;
        const apiUrl = `https://blynk.cloud/external/api/get?token=Nj_x0XR_IHVM8AcfZcXi71dugmPFBou2&v4`;
        const apiUrlBill = `https://blynk.cloud/external/api/get?token=Nj_x0XR_IHVM8AcfZcXi71dugmPFBou2&v10`;
        const responseStatusToggle = await axios.get(apiUrlStatusToggle);
        const response = await axios.get(apiUrl);
        const responseBill = await axios.get(apiUrlBill);
        setStatusToggle(responseStatusToggle.data);
        setDataBlynk(response.data);
        setDataBill(responseBill.data);
        
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    // Panggil fetchData saat komponen pertama kali dimount
    fetchDataBlynk();

    // Atur interval untuk mengambil data setiap 5 detik (sesuaikan sesuai kebutuhan Anda)
    const intervalId = setInterval(fetchDataBlynk, 500);

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    // Membaca status autentikasi pengguna
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser.email);
          setLoginTime(Date.now());
          setLoading(false); // Hentikan loading setelah autentikasi selesai
        } else {
          setUser(null);
          setLoading(false); // Hentikan loading jika tidak ada autentikasi
        }
      }
    );

    // Unsubscribe dari listeners saat komponen dibongkar
    return () => {
      unsubscribeAuth();
    };
  }, []);
  return (
    <BrowserRouter>
        <ChartDataProvider>
          <div className="  block">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute isAuthenticated={user}>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/landing-page"
                element={
                  <Private isAuthenticated={user}>
                    <LandingPage />
                  </Private>
                }
              />
              <Route
                path="/login"
                element={
                  <Private isAuthenticated={user}>
                    <Login />
                  </Private>
                }
              />
              <Route
                path="/register"
                element={
                  <Private isAuthenticated={user}>
                    <Register />
                  </Private>
                }
              />
              <Route
                path="/wallet"
                element={
                  <PrivateRoute isAuthenticated={user}>
                    <Maps />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-friends"
                element={
                  <PrivateRoute isAuthenticated={user}>
                    <Friends />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                    <Profile />
                }
              />
              <Route
                path="/notification"
                element={
                  <PrivateRoute isAuthenticated={user}>
                    <Notifcations statusToggle={statusToggle} dataBlynk={dataBlynk} dataBill={dataBill}/>
                  </PrivateRoute>
                }
              />
              <Route
                path="/pray"
                element={
                  <PrivateRoute isAuthenticated={user}>
                    <PrayPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
          {/* <div className="sm:flex hidden justify-center items-center min-h-screen">
            <h1 className="text-black text-[24px]">
              Hanya dapat di akses pada mobie phone
            </h1>
          </div> */}
        </ChartDataProvider>
    </BrowserRouter>
  );
}

export default App
const PrivateRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/landing-page" />;
  }
  return children;
};
const Private = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
