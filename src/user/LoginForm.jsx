import { useForm } from "react-hook-form";
import { zodResolver } from "./../../node_modules/@hookform/resolvers/zod/src/zod";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/auth";
import { authRequest } from "../services/auth";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LoginForm = () => {
  const Nav = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { setStateUser, stateUser } = useContext(AuthContext);

  const handleLogin = async (dataBody) => {
    const data = await authRequest("/login", dataBody);
    if (data.accessToken && confirm("Đăng nhập thành công ")) {
      Nav("/");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("email", data?.user?.email);
      localStorage.setItem("role", data?.user?.role);
      localStorage.setItem("user", JSON.stringify(data?.user));
      setStateUser(!stateUser);

      if (data.user.role === "admin") {
        Nav("/admin/products");
      } else Nav("/");
    } else {
      reset();
    }
  };

  return (
    <div className="form-user">
      <h2 className="header-user">Đăng Nhập</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        )}

        <label htmlFor="Password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password?.message}</p>
        )}
        <NavLink to="/user/register">
          <p
            type="submit"
            style={{ color: "blue", textAlign: "left", marginBottom: "10px" }}
          >
            Bạn có tài khoản chưa ?
          </p>
        </NavLink>
        <div>
          <button type="submit" className="btn-user">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
