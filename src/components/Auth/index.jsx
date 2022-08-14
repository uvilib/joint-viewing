import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserToStore } from "../../redux/slices/authSlice";
import { generateUser, getUser } from "../../utils/auth";

const Auth = () => {
  const dispatch = useDispatch();

  const authentication = async () => {
    const data = await generateUser();
    const user = await getUser(data.name);
    dispatch(
      setUserToStore({
        user: { userId: user.userId, token: user.token },
        isActualToken: true,
      })
    );
  };
  useEffect(() => {
    authentication();
  }, []);
  return <>auth</>;
};

export default Auth;
