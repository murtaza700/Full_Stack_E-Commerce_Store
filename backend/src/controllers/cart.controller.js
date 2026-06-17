import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
    try {
        const { item } = req.body;

        if (!item) {
            return res.status(400).json({
                success: false,
                message: 'Item is required!'
            });
        }

        const isItemExist = await Product.findById(item);

        if (!isItemExist) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }

        const isAlreadyAddedToCart = await Cart.findOne({ user: req.user.id, item: item });

        if (isAlreadyAddedToCart) {
            return res.status(200).json({
                success: true,
                message: 'Product is already in your cart!'
            });
        }

        const newCart = new Cart({
            user: req.user.id,
            item,
            quantity: 1
        });

        await newCart.save();

        return res.status(201).json({
            success: true,
            message: 'Product added to cart!',
            cart: newCart
        });

    } catch (err) {
        console.error(`Add To Cart Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
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
                message: 'Nothing in cart!',
                count: 0,
                allCarts: []
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Cart items found!',
            count: allCarts.length,
            allCarts
        });

    } catch (err) {
        console.error(`Get My All Cart Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
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
                message: 'Quantity must be a valid number greater than 0!'
            });
        }

        const cartItem = await Cart.findById(cartId);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found!'
            });
        }

        if (cartItem.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this cart item!'
            });
        }

        cartItem.quantity = parseQuantity;

        const updatedCartItem = await cartItem.save();

        return res.status(200).json({
            success: true,
            message: 'Quantity updated successfully!',
            cart: updatedCartItem
        });

    } catch (err) {
        console.error(`Update Cart Quantity Error! ${err}`);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid Cart ID format!'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const item = await Cart.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found!'
            });
        }

        if (req.user.id !== item.user.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You can not remove this item!'
            });
        }

        await item.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Item removed!'
        });

    } catch (err) {
        console.error(`Remove From Cart Error! ${err}`);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({ success: false, message: 'Invalid ID format!' });
        }

        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const removeAllFromCart = async (req, res) => {
    try {
        const deleteResult = await Cart.deleteMany({ user: req.user.id });

        if (deleteResult.deletedCount === 0) {
            return res.status(200).json({
                success: true,
                message: 'Your cart is already empty!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'All cart items removed successfully!'
        });
        
    } catch (err) {
        console.error(`Remove All From Cart Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}