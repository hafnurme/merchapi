import { User } from "../models/Models.js";
import jwt from "jsonwebtoken";

const refresh_token = async (req, res) => {
  try {
    console.log(req.cookies.refreshToken);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await User.findAll({
      where: {
        refreshToken: refreshToken,
      },
    });

    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) res.sendStatus(403);
        const userID = user[0].id;
        const nama_toko = user[0].nama_toko;
        const email = user[0].email;

        const accessToken = jwt.sign(
          { userID, nama_toko, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );
        res.json({
          accessToken,
          user: {
            id: user[0].id,
            nama_toko: user[0].nama_toko,
            avatar: user[0].avatar
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export { refresh_token };
