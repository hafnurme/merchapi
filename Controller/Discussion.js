import { Balasan, Disscussion, Products, User } from "../models/Models.js";

const getDiscussion = async (req, res) => {
  try {
    const disscussion = await Disscussion.findAll({
      attributes: ["id", "message", "productId"],
      include: [
        {
          model: User,
          attributes: ["id", "nama_toko"],
        },
        {
          model: Balasan,
        },
      ],
    });
    res.json({
      disscussion,
    });
  } catch (error) {
    console.log(error);
  }
};

const addDiscussion = async (req, res) => {
  const { message, productId, userId } = req.body;
  try {
    await Disscussion.create({
      message: message,
      productId: productId,
      userId: userId,
    });
    res.json({
      msg: "discussion Posted",
    });
  } catch (error) {
    console.log(error);
  }
};

export { getDiscussion, addDiscussion };
