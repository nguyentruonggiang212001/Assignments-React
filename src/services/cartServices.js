import instance from ".";

export const getAllCart = async () => {
  const { data } = await instance.get("/carts");
  console.log(data);
  return data;
};

export const getByIdCart = async (id) => {
  const { data } = await instance.get(`/carts/${id}`);
  return data;
};

export const getByCategory = async (category) => {
  try {
    const { data } = await instance.get(`/carts?category=${category}`);
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
    return [];
  }
};

export const addCart = async (product) => {
  const { data } = await instance.post("/carts", product);
  return data;
};

export const deleteCart = async (id) => {
  try {
    const res = await instance.delete(`/carts/${id}`);
    return res.status === 200;
  } catch (error) {
    console.error("Lỗi khi xóa giỏ hàng:", error);
    return false;
  }
};

export const updateCart = async (id, product) => {
  console.log(id, product);

  const { data } = await instance.patch(`/carts/${id}`, { quantity: product });
  return data;
};
