import { ProductCategory } from "../models/Models.js";

const getCategory = async (req, res) => {
  try {
    const productsCategory = await ProductCategory.findAll({
      attributes: ["id", "nama"],
    });
    res.json({
      productsCategory,
    });
  } catch (error) {
    console.log(error);
  }
};

const addCategory = async (req, res) => {
  const { nama } = req.body;

  try {
    await ProductCategory.create({
      nama: nama,
    });
    res.json({
      msg: "cattegory succesfully added",
    });
  } catch (error) {
    console.log(error);
  }
};

export { getCategory, addCategory };
