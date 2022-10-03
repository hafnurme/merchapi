import Express from "express";
import { getUsers, register, login, logout } from "../Controller/Users.js";
import { getCategory, addCategory } from "../Controller/ProductCategory.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refresh_token } from "../Controller/RefreshToken.js";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getProductByNama,
  updateProduct,
} from "../Controller/Product.js";
import { addDiscussion, getDiscussion } from "../Controller/Discussion.js";
import { addBalasan, getBalasan } from "../Controller/Balasan.js";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = Express.Router();

router.route("/users").get(getUsers);
router.post("/users", upload.single("avatar"), register);
router.post("/login", login);
router.get("/token", refresh_token);
router.get("/logout", logout);

router
  .route("/product_category")
  .get(verifyToken, getCategory)
  .post(verifyToken, addCategory);

router
  .route("/products")
  .get(getAllProduct)
  .post(verifyToken, addProduct)
  .put(verifyToken, updateProduct)
  .delete(verifyToken, deleteProduct);
router.get("/products/:userId", getProduct);
router.get("/productsBy/:nama", getProductByNama);

router
  .route("/discussion")
  .get(verifyToken, getDiscussion)
  .post(verifyToken, addDiscussion);

router
  .route("/balasan")
  .get(verifyToken, getBalasan)
  .post(verifyToken, addBalasan);

router.post("/img", upload.single("img"), (req, res) => {
  res.send(req.file.originalname);
});
export default router;
