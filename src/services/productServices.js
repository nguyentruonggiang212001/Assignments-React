import instance from ".";

export const getAllProducts = async () => {
  const { data } = await instance.get("/products");
  return data;
};

export const getById = async (id) => {
  const { data } = await instance.get(`/products/${id}`);
  return data;
};

export const getByCategory = async (category) => {
  try {
    const { data } = await instance.get(`/products?category=${category}`);
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
    return [];
  }
};

export const addProduct = async (product) => {
  const { data } = await instance.post("/products", product);
  return data;
};

export const deleteProduct = async (id) => {
  const res = await instance.delete(`/products/${id}`);
  return res.ok;
};

export const updateProduct = async (id, product) => {
  const { data } = await instance.patch(`/products/${id}`, product);
  return data;
};
