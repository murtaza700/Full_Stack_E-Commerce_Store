import Wishlist from "../models/wishlist.model.js";
import Product from '../models/product.model.js';

export const toggleWishlist = async (req, res) => {
    try {
        const { item } = req.body;

        if (!item) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required!'
            });
        }

        const isProductExist = await Product.findById(item);
        if (!isProductExist) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }

        const wishlistRecord = await Wishlist.findOne({ user: req.user.id, item: item });
        if (wishlistRecord) {
            await wishlistRecord.deleteOne();
            return res.status(200).json({
                success: true,
                message: 'Product removed from wishlist!',
                isWishlisted: false
            });
        }

        const newWish = new Wishlist({
            user: req.user.id,
            item
        });

        await newWish.save();

        return res.status(201).json({
            success: true,
            message: 'Item added to wishlist!',
            item: newWish,
            isWishlisted: true
        });

    } catch (err) {
        console.error(`Toggle Wishlist Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const getAllWishlist = async (req, res) => {
    try {
        const allWish = await Wishlist.find({ user: req.user.id })
            .populate({
                path: 'item',
                select: 'title price image'
            })
            .sort('-createdAt');

        if (!allWish || allWish.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Nothing in Wishlist!',
                count: 0,
                allWish: []
            });
        }

        return res.status(200).json({
            success: true,
            message: 'All wishlist found!',
            count: allWish.length,
            allWish
        });

    } catch (err) {
        console.error(`Get All Wishlist Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const clearWishlist = async (req, res) => {
    try {
        const removeAllwishList = await Wishlist.deleteMany({ user: req.user.id });

        return res.status(200).json({
            success: true,
            message: 'Your Wishlist is clear!'
        });

    } catch (err) {
        console.error(`Clear Wishlist Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}