import { Balasan } from "../models/Models.js";

const getBalasan = async (req, res) => {
  try {
    const balasan = await Balasan.findAll({
      attributes: ["id", "message", "userId", "discussionId"],
    });
    res.json({ balasan });
  } catch (error) {
    console.log(error);
  }
};

const addBalasan = async (req, res) => {
  const { message, userId, discussionId } = req.body;
  try {
    await Balasan.create({
      message: message,
      userId: userId,
      discussionId: discussionId,
    });
    res.json({ msg: "balasan Posted" });
  } catch (error) {
    console.log(error);
  }
};

export { getBalasan, addBalasan };
