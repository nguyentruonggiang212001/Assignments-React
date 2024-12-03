import {useForm} from  "react-hook-form";
import { zodResolver } from './../../node_modules/@hookform/resolvers/zod/src/zod';
import { Link, useNavigate} from "react-router-dom";
import { authRequest } from "../services/auth";
import { registerSchema } from "../schemas/auth";




export const RegisterForm = () => {
  const Nav = useNavigate(); 
  const {
	register,
	formState: { errors },
	handleSubmit,
  reset
	} = useForm(
    {resolver:zodResolver(registerSchema),}
  );

   const handleRegisterUser = async (dataBody) => {
      const data = await authRequest("/register", dataBody);
      if(data.user && confirm("Đăng nhập ngay ?"))
      Nav("/user/login")
      else{
        reset();
      }
    
  };

  return (
     <div className="form-update">
        <h2>Đăng Kí</h2>
      <form onSubmit={handleSubmit(handleRegisterUser)}>
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          {...register("email")}    
        />
        {errors.email && <p style={{color:"red"}}>{errors.email?.message}</p>}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          {...register("username")}    
        />
        {errors.username && <p style={{color:"red"}}>{errors.username?.message}</p>}

        <label htmlFor="Password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          {...register("password")}
        />
         {errors.password && <p style={{color:"red"}}>{errors.password?.message}</p>}

        <label htmlFor="confirmPass">ConfirmPass</label>
        <input
          type="text"
          name="confirmPass"
          id="confirmPass"
          placeholder="ConfirmPass"
          {...register("confirmPass")}
        />
         {errors.confirmPass && <p style={{color:"red"}}>{errors.confirmPass?.message}</p>}
         <Link to="/user/login">
            <p type="submit" style={{color:"blue",textAlign:"left",marginBottom:"15px"}}>
              Bạn đã có tài khoản rồi à ?
            </p>
          </Link>
        <div>
            <button style={{backgroundColor:"blue",width:"100%",margin:"0px"}} type="submit">
              Register
            </button>
        </div>
      </form>
    </div>
  )
}