import { User, Products, ProductCategory } from "../models/Models.js";

const getAllProduct = async (req, res) => {
  try {
    const products = await Products.findAll({
      attributes: ["id", "nama", "harga", "description", "stock"],
      include: [
        {
          model: User,
          attributes: ["nama_toko"],
        },
        {
          model: ProductCategory,
          attributes: ["nama"],
        },
      ],
    });
    res.json({
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Products.findAll({
      attributes: ["id", "nama", "harga", "description", "stock"],
      include: [
        {
          model: User,
          attributes: ["nama_toko"],
        },
        {
          model: ProductCategory,
          attributes: ["nama"],
        },
      ],
      where: {
        userId: req.params.userId,
      },
    });
    res.json({
      products,
    });
  } catch (error) {
    res.json({
      error,
    });
    console.log(error);
  }
};

const getProductByNama = async (req, res) => {
  try {
    const products = await Products.findAll({
      attributes: ["nama", "harga", "description", "stock"],
      include: [
        {
          model: User,
          attributes: ["nama_toko"],
        },
        {
          model: ProductCategory,
          attributes: ["nama"],
        },
      ],
      where: {
        nama: req.params.nama,
      },
    });
    res.json({
      products,
    });
  } catch (error) {
    res.json({
      error,
    });
    console.log(error);
  }
};

const addProduct = async (req, res) => {
  const { nama, harga, description, stock, userId, productCategoryId } =
    req.body;
  try {
    await Products.create({
      nama: nama,
      harga: harga,
      description: description,
      stock: stock,
      userId: userId,
      productCategoryId: productCategoryId,
    });
    res.json({
      msg: "data was added",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  const { id, nama, harga, description, stock, productCategoryId } = req.body;
  try {
    await Products.update(
      {
        nama: nama,
        harga: harga,
        description: description,
        stock: stock,
        productCategoryId: productCategoryId,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ msg: "data Updated" });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;

  try {
    await Products.destroy({
      where: {
        id: id,
      },
    });
    res.json({ msg: "data Deleted" });
  } catch (error) {
    console.log(error);
  }
};

export {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProductByNama,
};
