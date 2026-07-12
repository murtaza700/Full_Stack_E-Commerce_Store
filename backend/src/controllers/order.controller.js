import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

export const createOrder = async (req, res) => {
    try {
        const { orderItems, address, city, postalCode, phone, email, paymentMethod, transactionId } = req.body;

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
                    message: `One or more products in your cart could not be found!`
                });
            }
            const itemTotalPrice = dbProduct.price * item.quantity;
            itemsPrice += itemTotalPrice;

            finalOrderItems.push({
                item: item.item,
                quantity: item.quantity
            });
        }

        const shippingPrice = itemsPrice > 5000 ? 0 : 250;

        const taxPrice = Math.round(itemsPrice * 0.15);

        const totalPrice = itemsPrice + shippingPrice + taxPrice;
        const simulatedCardTrigger = paymentMethod === 'Card';

        const newOrder = new Order({
            user: req.user.id,
            orderItems: finalOrderItems,
            address,
            city,
            postalCode,
            phone,
            email,
            paymentMethod: paymentMethod || 'COD',
            transactionId: simulatedCardTrigger ? (transactionId || 'MOCK_PORTFOLIO_TXN_VALID') : null,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: simulatedCardTrigger,
            paidAt: simulatedCardTrigger ? new Date() : null
        });

        const savedOrder = await newOrder.save();

        return res.status(201).json({
            success: true,
            message: simulatedCardTrigger
                ? 'Payment successful. Order placed!'
                : 'Order placed successfully. Cash due on delivery!',
            order: savedOrder
        });

    } catch (err) {
        console.error(`Order Creating Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
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
                success: true,
                message: 'You have not placed any orders yet!',
                orders: []
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully!',
            count: orders.length,
            orders
        });

    } catch (err) {
        console.error(`Get My Orders Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
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
                message: 'Access denied!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Order retrieved successfully!',
            order
        });

    } catch (err) {
        console.error(`Get My Single Order Error! ${err}`);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid order request!'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
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
                message: 'This order is already marked as delivered!'
            });
        }

        if (status === 'Delivered') {
            order.isDelivered = true;
        }

        order.orderStatus = status;

        const updatedOrder = await order.save();

        return res.status(200).json({
            success: true,
            message: `Order status updated to ${status}!`,
            updatedOrder
        });

    } catch (err) {
        console.error(`Update Order Status Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}

export const getAllOrdersAdmin = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', status = '', sort = '-createdAt' } = req.query;

        const numericPageNumber = Number(page) || 1;
        const numericLimitSize = Number(limit) || 10;
        const structuralSkipOffset = (numericPageNumber - 1) * numericLimitSize;

        let databaseFilterQuery = {};
        if (search && search.trim() !== '') {
            const cleanSearchToken = search.trim();

            if (cleanSearchToken.match(/^[0-9a-fA-F]{24}$/)) {
                databaseFilterQuery._id = cleanSearchToken;
            } else {
                databaseFilterQuery.$or = [
                    { email: { $regex: cleanSearchToken, $options: 'i' } },
                    { city: { $regex: cleanSearchToken, $options: 'i' } },
                    { phone: { $regex: cleanSearchToken, $options: 'i' } }
                ];
            }
        }

        if (status && status.trim() !== '' && status !== 'All') {
            databaseFilterQuery.orderStatus = status;
        }


        const totalMatchingDocumentsInDb = await Order.countDocuments(databaseFilterQuery);
        const calculatedTotalPagesCount = Math.ceil(totalMatchingDocumentsInDb / numericLimitSize) || 1;


        const queriedOrdersPayload = await Order.find(databaseFilterQuery)
            .populate('user', 'fullName email')
            .populate({
                path: 'orderItems.item',
                select: 'title price image'
            })
            .sort(sort)
            .skip(structuralSkipOffset)
            .limit(numericLimitSize);


        const fullOrdersCapitalAggregate = await Order.find(databaseFilterQuery);
        const totalAmountEarnedAcrossQuery = fullOrdersCapitalAggregate.reduce((accumulatedSum, orderNode) => {
            if (orderNode.orderStatus?.toLowerCase() === 'cancelled') return accumulatedSum;
            return accumulatedSum + (orderNode.totalPrice || 0);
        }, 0);

        return res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully!',
            count: totalMatchingDocumentsInDb,
            totalRevenue: Number(totalAmountEarnedAcrossQuery.toFixed(2)),
            meta: {
                totalOrders: totalMatchingDocumentsInDb,
                totalPages: calculatedTotalPagesCount,
                currentPage: numericPageNumber,
                limit: numericLimitSize
            },
            orders: queriedOrdersPayload
        });

    } catch (err) {
        console.error(`GetALlOrdersAdmin Filters Repaired Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
};

export const getOrderDetailsAdmin = async (req, res) => {
    try {
        const targetOrderIdToken = req.params.id;

        const singleOrderMatchNode = await Order.findById(targetOrderIdToken)
            .populate('user', 'fullName email')
            .populate({
                path: 'orderItems.item',
                select: 'title price image category descriptions description'
            });

        if (!singleOrderMatchNode) {
            return res.status(404).json({
                success: false,
                message: 'Order not found!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Order details retrieved successfully!',
            order: singleOrderMatchNode
        });

    } catch (err) {
        console.error(`Backend Error inside getOrderDetailsAdmin: ${err}`);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid order request!'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
};

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
                    message: 'Access denied!'
                });
            }

            if (order.orderStatus !== 'Pending' && order.orderStatus !== 'Cancelled') {
                return res.status(400).json({
                    success: false,
                    message: `Cannot cancel order since it is already ${order.orderStatus.toLowerCase()}!`
                });
            }

        }

        await order.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Order deleted successfully!'
        });

    } catch (err) {
        console.error(`Order Delete Error! ${err}`);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid order request!'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}