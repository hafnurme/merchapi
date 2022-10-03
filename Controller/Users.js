import { User } from "../models/Models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "nama_toko", "avatar"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  console.log(req.body);
  const { nama_toko, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    return res.status(400).json({
      msg: "Password & Confirm Password tidak sama",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassord = await bcrypt.hash(password, salt);

  try {
    await User.create({
      nama_toko: nama_toko,
      email: email,
      password: hashPassord,
      avatar: req.file.originalname,
    });

    res.json({
      msg: "Register Berhasil ",
    });
  } catch (error) {
    res.json({
      msg: error.fields,
      problem: "sudah digunakan",
    });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: ["id", "nama_toko", "email", "password" , "avatar"],
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(400).json({
        msg: "Password Salah!",
      });
    }

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
    const refreshToken = jwt.sign(
      { userID, nama_toko, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await User.update(
      { refreshToken: refreshToken },
      {
        where: {
          id: userID,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        nama_toko: nama_toko,
        id: userID,
        avatar: user[0].avatar
      },
      accessToken,
    });
  } catch (error) {
    res.status(400).send({
      msg: "Email tidak ditemukan!",
    });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await User.findAll({
    where: {
      refreshToken: refreshToken,
    },
  });

  if (!user[0]) return res.sendStatus(204);

  const userID = user[0].id;
  await User.update(
    { refreshToken: null },
    {
      where: {
        id: userID,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export { getUsers, register, login, logout };
