import instance from ".";

//login

export const loginAccount = async (databody) => {
  try {
    const { data } = await instance.post("/login", databody);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//register

export const registerAccount = async (databody) => {
  try {
    const { data } = await instance.post("/register", databody);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Cách 2

export const authRequest = async (path, databody) => {
  try {
    const { data } = await instance.post(`${path}`, databody);
    return data;
  } catch (error) {
    console.error(error);
    alert(error?.response?.data || "Đã xảy ra lỗi.");
    return null;
  }
};
