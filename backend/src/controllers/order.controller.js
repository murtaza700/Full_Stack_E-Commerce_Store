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
            return res.status(200).json({
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

export const getMySingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate({
                path: 'orderItems.item',
                select: 'title price image'
            });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found!'
            });
        }

        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this order!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Order found!',
            order
        });

    } catch (err) {
        console.error(`Get My Single Order Error! ${err}`);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid Order ID format!'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const updateOrderStatusAdmin = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found!'
            });
        }

        if (order.orderStatus === 'Delivered') {
            return res.status(400).json({
                success: false,
                message: 'You have already delivered this order!'
            });
        }

        if (status === 'Delivered') {
            order.isDelivered = true;
        }

        order.orderStatus = status;

        const updatedOrder = await order.save();

        return res.status(200).json({
            success: true,
            message: `Order status updated to ${status} successfully!`,
            updatedOrder
        });

    } catch (err) {
        console.error(`Update Order Status Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const getAllOrdersAdmin = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'fullName email')
            .populate({
                path: 'orderItems.item',
                select: 'title price image'
            })
            .sort('-createdAt');

        if (!orders || orders.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Order not founds',
                orders: []
            });
        }

        const totalAmountEarned = orders.reduce((sum, order) => sum + order.totalPrice, 0);

        return res.status(200).json({
            success: true,
            message: 'All system orders fetched successfully!',
            count: orders.length,
            totalRevenue: Number(totalAmountEarned.toFixed(2)),
            orders
        });

    } catch (err) {
        console.error(`GetALlOrdersAdmin Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const deleteOrderAdmin = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found!'
            });
        }

        if (req.user.role !== 'admin') {

            if (order.user.toString() !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to delete this order!'
                });
            }

            if (order.orderStatus !== 'Pending' && order.orderStatus !== 'Cancelled') {
                return res.status(400).json({
                    success: false,
                    message: `Cannot cancel order! It is already ${order.orderStatus}.`
                });
            }

        }

        await order.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Order Deleted!'
        });

    } catch (err) {
        console.error(`Order Delete Error! ${err}`);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid Order ID format!'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}