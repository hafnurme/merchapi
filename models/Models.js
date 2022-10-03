import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "products",
  {
    nama: {
      type: DataTypes.STRING(100),
    },
    harga: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

const User = db.define(
  "users",
  {
    nama_toko: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    refreshToken: DataTypes.TEXT,
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

const ProductCategory = db.define(
  "product_category",
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

const Disscussion = db.define(
  "discussion",
  {
    message: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

const Balasan = db.define(
  "balasan",
  {
    message: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Products);
Products.belongsTo(User);
Products.belongsTo(ProductCategory);
ProductCategory.hasMany(Products);
Products.hasMany(Disscussion);
Disscussion.belongsTo(User);
Disscussion.belongsTo(Products);
Disscussion.hasMany(Balasan);

const Models = () => {
  User.sync();
  ProductCategory.sync();
  Products.sync();
  Disscussion.sync();
  Balasan.sync();
};

export { Products, User, ProductCategory, Disscussion, Balasan, Models };
