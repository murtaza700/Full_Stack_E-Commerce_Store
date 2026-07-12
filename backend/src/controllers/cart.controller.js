import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
    try {
        const { item, quantity, isFromDetails } = req.body;

        if (!item) {
            return res.status(400).json({
                success: false,
                message: 'Product is required!'
            });
        }

        const isItemExist = await Product.findById(item);
        if (!isItemExist) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }

        const purchaseQuantity = Number(quantity) || 1;

        let cartItem = await Cart.findOne({ user: req.user.id, item: item });

        if (cartItem) {

            if (isFromDetails) {
                cartItem.quantity = purchaseQuantity;
                await cartItem.save();

                const populatedItem = await Cart.findById(cartItem._id).populate({
                    path: 'item', select: 'title price image'
                });

                return res.status(200).json({
                    success: true,
                    message: 'Shopping bag quantity updated!',
                    cart: populatedItem,
                    isUpdated: true
                });
            }

            return res.status(200).json({
                success: false,
                isDuplicate: true,
                message: 'This item is already in your shopping bag!'
            });
        }

        const newCart = new Cart({
            user: req.user.id,
            item,
            quantity: purchaseQuantity
        });

        await newCart.save();

        const populatedNewItem = await Cart.findById(newCart._id).populate({
            path: 'item', select: 'title price image'
        });

        return res.status(201).json({
            success: true,
            message: 'Added to your shopping bag!',
            cart: populatedNewItem
        });

    } catch (err) {
        console.error(`Add To Cart Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}

export const getMyCart = async (req, res) => {
    try {
        const allCarts = await Cart.find({ user: req.user.id })
            .populate({
                path: 'item',
                select: 'title price image'
            })
            .sort('-createdAt');

        if (!allCarts || allCarts.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Your shopping bag is empty!',
                count: 0,
                allCarts: []
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Shopping bag items retrieved!',
            count: allCarts.length,
            allCarts
        });

    } catch (err) {
        console.error(`Get My All Cart Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}

export const updateCartQuantity = async (req, res) => {
    try {
        const cartId = req.params.id;
        const { quantity } = req.body;

        if (quantity === undefined || quantity === null) {
            return res.status(400).json({
                success: false,
                message: 'Quantity is required!'
            });
        }

        const parseQuantity = Number(quantity);

        if (isNaN(parseQuantity) || parseQuantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Invalid quantity value!'
            });
        }

        const cartItem = await Cart.findById(cartId);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in shopping bag!'
            });
        }

        if (cartItem.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied!'
            });
        }

        cartItem.quantity = parseQuantity;

        const updatedCartItem = await cartItem.save();

        const fullyPopulatedCartRecord = await Cart.findById(updatedCartItem._id).populate({
            path: 'item',
            select: 'title price image'
        });

        return res.status(200).json({
            success: true,
            message: 'Quantity updated!',
            cart: fullyPopulatedCartRecord
        });

    } catch (err) {
        console.error(`Update Cart Quantity Error! ${err}`);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid request parameters!'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const item = await Cart.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }

        if (req.user.id !== item.user.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Access denied!'
            });
        }

        await item.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Item removed from shopping bag!'
        });

    } catch (err) {
        console.error(`Remove From Cart Error! ${err}`);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid request!'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}

export const removeAllFromCart = async (req, res) => {
    try {
        const deleteResult = await Cart.deleteMany({ user: req.user.id });

        if (deleteResult.deletedCount === 0) {
            return res.status(200).json({
                success: true,
                message: 'Your shopping bag is already empty!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Shopping bag cleared successfully!'
        });

    } catch (err) {
        console.error(`Remove All From Cart Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}