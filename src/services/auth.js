import instance from ".";

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
