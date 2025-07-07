import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import stripe from "stripe";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;

    if (!items || !address) {
      return res
        .status(400)
        .json({ message: "Items and address are required", success: false });
    }
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor((amount * 2) / 100);
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });
    res
      .status(201)
      .json({ message: "Order placed successfully", success: true, amount });
  } catch (error) {
    console.log(" Error placing order: ", error);
    res.status(500).json({ message: " Internal server error" });
  }
};

// place order stripe

export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    const { origin } = req.headers;

    if (!items || !address) {
      return res
        .status(400)
        .json({ message: "Items and address are required", success: false });
    }
    let productData = [];
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor((amount * 2) / 100);
  const order =  await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "Online",
      isPaid: true,
    });
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price * item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata:{
        orderId: order._id.toString(),
        userId,
      }
    });

    res
      .status(201)
      .json({ message: "Order placed successfully", success: true, url:session.url});
  } catch (error) {
    console.log(" Error placing order: ", error);
    res.status(500).json({ message: " Internal server error" });
  }
};

// order details

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createAt: -1 });
    res.status(201).json({ success: true, orders });
  } catch (error) {
    console.log(" Error placing order: ", error);
    res.status(500).json({ message: " Internal server error" });
  }
};

// get all orders for admin

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: false }],
    })
      .populate("items.product address")
      .sort({ createAt: -1 });
    res.status(201).json({ success: true, orders });
  } catch (error) {
    console.log(" Error placing order: ", error);
    res.status(500).json({ message: " Internal server error" });
  }
};
