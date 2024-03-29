import products from "../models/products.js";

export const addProducts = async (req, res) => {
  const productData = req.body;
  const { name, description, category, price, quantity, brand, merchantId } =
    productData;
  var img = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };
  const newProduct = new products({
    name,
    description,
    category,
    price,
    initialQuantity: quantity,
    quantity,
    brand,
    img,
    merchantId,
  });
  try {
    await newProduct.save();
    return res.status(200).json("Added a new product successfully");
  } catch (error) {
    return res
      .status(400)
      .json(`Couldn't added a new product. Error : ${error?.response?.data}`);
  }
};

export const getProductsOfMerchant = async (req, res) => {
  const { merchantId } = req.query;
  try {
    const productList = await products
      .find({
        merchantId: merchantId,
        isActive: true,
      })
      .lean();
    return res.status(200).json(productList);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { merchantId, productId } = req.query;
  try {
    const existingProduct = await products.findOneAndUpdate(
      {
        merchantId,
        _id: productId,
      },
      { isActive: false }
    );
    if (!existingProduct) return res.status(404).json("Product not found");

    return res.status(200).json("Product deleted sucessfully");
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export const getAllProducts = async (req, res) => {
  const {
    query: { page = "1", limit = "8" },
  } = req;
  try {
    const productList = await products
      .find({ isActive: true })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const productCount = await products.countDocuments({ isActive: true });
    const responseObj = {
      productList,
      productCount,
    };
    return res.status(200).json(responseObj);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.query;
  try {
    const productList = await products.findOne({
      isActive: true,
      _id: productId,
    });
    return res.status(200).json(productList);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export const getProductsByCategory = async (req, res) => {
  const {
    query: { page = "1", limit = "8", category },
  } = req;
  try {
    if (category === "all") {
      const productsList = await products.aggregate([
        {
          $match: {
            isActive: true,
          },
        },
        {
          $facet: {
            items: [
              { $skip: Number(page) - 1 }, // replace 10 with the number of documents you want to skip
              { $limit: Number(limit) }, // replace 20 with the number of documents you want to retrieve
            ],
            count: [
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
          },
        },
      ]);
      const responseObj = {
        productList: productsList[0]?.items,
        productCount: productsList[0]?.count[0]?.count,
      };
      return res.status(200).json(responseObj);
    } else {
      const productsList = await products.aggregate([
        {
          $match: {
            category: category,
            isActive: true,
          },
        },
        {
          $facet: {
            items: [
              { $skip: Number(page) - 1 }, // replace 10 with the number of documents you want to skip
              { $limit: Number(limit) }, // replace 20 with the number of documents you want to retrieve
            ],
            count: [
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
          },
        },
      ]);
      const responseObj = {
        productList: productsList[0]?.items,
        productCount: productsList[0]?.count[0]?.count,
      };
      return res.status(200).json(responseObj);
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export const updateProduct = async (req, res) => {
  const { merchantId, productId, description, quantity } = req.body;
  try {
    const updatedProduct = await products
      .findOneAndUpdate(
        { merchantId, _id: productId },
        { description, quantity },
        { new: true }
      )
      .lean();
    if (!updatedProduct) return res.status(404).json("Product not found");
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
