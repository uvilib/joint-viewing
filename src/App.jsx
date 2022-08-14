import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Main from "./components/Main";
import { Navigate, Route, Routes } from "react-router-dom";
import { fetchUserFromFirebase } from "./redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./components/Loader";

const authRoutes = (
  <Routes>
    <Route path="/auth" element={<Auth />} />
    <Route path="*" element={<Navigate to="/auth" replace />} />
  </Routes>
);

const mainRoutes = (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const loaderRoutes = (
  <Routes>
    <Route path="/" element={<Loader />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.user?.token);
  const isActualToken = useSelector((state) => state?.user?.isActualToken);

  useEffect(() => {
    setIsLoading(true);
    if (!token) {
      dispatch(fetchUserFromFirebase());
    }
    setIsLoading(false);
  }, [token, dispatch]);

  if (isLoading) {
    return loaderRoutes;
  }

  return (
    <>
      {token && isActualToken
        ? mainRoutes
        : token && !isActualToken
        ? authRoutes
        : null}
    </>
  );
};

export default App;
