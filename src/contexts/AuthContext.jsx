import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetCarts } from "../features/products/cartSlice";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [stateUser, setStateUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(data);
  }, [stateUser]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setStateUser(!stateUser);
    dispatch(resetCarts());
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        setStateUser,
        stateUser,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
