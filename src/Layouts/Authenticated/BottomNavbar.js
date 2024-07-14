import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../Database/Fire";
import { Navigate, NavLink, useLocation } from "react-router-dom";

const BottomNavbar = ({ children }) => {
  const { pathname } = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  // Update activeIndex based on pathname
  useEffect(() => {
    switch (pathname) {
      case "/":
        setActiveIndex(0);
        break;
      case "/profile":
        setActiveIndex(1);
        break;
      case "/notification":
        setActiveIndex(2);
        break;
      case "/history":
        setActiveIndex(3);
        break;
      default:
        setActiveIndex(0);
        break;
    }
  }, [pathname]);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("uid");
        <Navigate to="/login" />;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <main>{children}</main>
       {pathname === "/landing-page" ||
        pathname === "/register" ||
        pathname === "/login" ? null : (
        <div className="containerNavbar">
          <div className="containerNavbarBottom">
            <div className="navigation">
              <ul>
                <NavLink to="/">
                  <li className={`list ${activeIndex === 0 ? "active" : ""}`}>
                    <a>
                      <span className="icon">
                        <ion-icon name="home-outline"></ion-icon>
                      </span>
                      <span className="text">Home</span>
                      <span className="circle"></span>
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/profile">
                  <li className={`list ${activeIndex === 1 ? "active" : ""}`}>
                    <a>
                      <span className="icon">
                        <ion-icon name="person-outline"></ion-icon>
                      </span>
                      <span className="text">Profile</span>
                      <span className="circle"></span>
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/notification">
                  <li className={`list ${activeIndex === 2 ? "active" : ""}`}>
                    <a>
                      <span className="icon">
                        <ion-icon name="albums-outline"></ion-icon>
                      </span>
                      <span className="text">History</span>
                      <span className="circle"></span>
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/history">
                  <li className={`list ${activeIndex === 3 ? "active" : ""}`}>
                    <a>
                      <span className="icon">
                        <ion-icon name="chatbubble-outline"></ion-icon>
                      </span>
                      <span className="text">Notification</span>
                      <span className="circle"></span>
                    </a>
                  </li>
                </NavLink>
                <li
                  className={`list ${activeIndex === 4 ? "active" : ""}`}
                  onClick={signOutHandler}
                >
                  <a>
                    <span className="icon">
                      <ion-icon name="log-out-outline"></ion-icon>
                    </span>
                    <span className="text">Logout</span>
                    <span className="circle"></span>
                  </a>
                </li>
                <div
                  className="indicator"
                  style={{
                    transform: `translateX(calc(70px * ${activeIndex}))`,
                  }}
                ></div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNavbar;
