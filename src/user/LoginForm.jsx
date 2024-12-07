import {useForm} from  "react-hook-form";
import { zodResolver } from './../../node_modules/@hookform/resolvers/zod/src/zod';
import {NavLink, useNavigate} from "react-router-dom";
import { loginSchema } from "../schemas/auth";
import { authRequest } from "../services/auth";



const LoginForm = () => {
  const Nav = useNavigate(); 
  const {
		register,
		formState: { errors },
		handleSubmit,

    reset
	} = useForm(
    {resolver:zodResolver(loginSchema),}
  );

    const handleLogin = async (dataBody) => {
    const data = await authRequest("/login", dataBody);
    console.log(data);
    console.log(handleSubmit);
    if(data.accessToken && confirm("Đăng nhập thành công bạn có muốn về trang chủ không ?")){
      localStorage.setItem("accessToken",data.accessToken)
      localStorage.setItem("user",JSON.stringify(data?.user))
      localStorage.setItem("role",data?.user?.role)

     Nav("/")
    }else{
      reset();
    }
   
  };
  return (
       <div className="form-update">
        <h2>Đăng Nhập</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          {...register("email",{required:true})}    
        />
        {errors.email && <p style={{color:"red"}}>{errors.email?.message}</p>}

        <label htmlFor="Password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          {...register("password", { required: true})}
        />
         {errors.password && <p style={{color:"red"}}>{errors.password?.message}</p>}
          <NavLink to="/user/register">
            <p type="submit" style={{color:"blue",textAlign:"left",marginBottom:"10px"}}>
              Bạn có tài khoản chưa ?
            </p>
          </NavLink>
        <div>
          <button type="submit" style={{backgroundColor:"blue",width:"100%",margin:"0px"}}>
          Login
        </button>
        
        </div>
      </form>
    </div>
  );
};

export default LoginForm;