import ordersSchema from "../models/orders.js";

export const getUserOrders = async (req, res) => {
  const { userId } = req.query;
  try {
    const orders = await ordersSchema
      .find({ userId, status: { $ne: "PENDING" } })
      .populate({ path: "productId", model: "Products" })
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export const getMerchantOrders = async (req, res) => {
  const { merchantId } = req.query;
  try {
    const orders = await ordersSchema
      .find({ merchantId, status: { $ne: "PENDING" } })
      .populate([
        {
          path: "productId",
          model: "Products",
        },
        {
          path: "userId",
          model: "User",
          select: "name email mobile address",
        },
      ])
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
