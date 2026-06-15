import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

export const createOrder = async (req, res) => {
    try {
        const { orderItems, address, city, postalCode, phone, email } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No order items found!'
            });
        }

        let itemsPrice = 0;
        const finalOrderItems = [];

        for (const item of orderItems) {
            const dbProduct = await Product.findById(item.item);

            if (!dbProduct) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found with id: ${item.item}`
                });
            }

            const itemTotalPrice = dbProduct.price * item.quantity;
            itemsPrice += itemTotalPrice;

            finalOrderItems.push({
                item: item.item,
                quantity: item.quantity
            });
        }

        const shippingPrice = itemsPrice > 500 ? 0 : 50;

        const taxPrice = Number((0.15 * itemsPrice).toFixed(2));

        const totalPrice = itemsPrice + shippingPrice + taxPrice;

        const newOrder = new Order({
            user: req.user.id,
            orderItems: finalOrderItems,
            address,
            city,
            postalCode,
            phone,
            email,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: false,
            paidAt: null
        });

        const savedOrder = await newOrder.save();

        return res.status(201).json({
            success: true,
            message: 'Order placed successfully!',
            order: savedOrder
        });

    } catch (err) {
        console.error(`Order Creating Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const getMyAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate({
                path: 'orderItems.item',
                select: 'title price image'
            })
            .sort('-createdAt');

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'You have not placed any orders yet.',
                orders: []
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Orders found!',
            count: orders.length,
            orders
        });

    } catch (err) {
        console.error(`Get My Orders Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}