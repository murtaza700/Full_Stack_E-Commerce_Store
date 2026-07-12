import Featured from "../models/featured.model.js";
import Product from "../models/product.model.js";

export const toggleFeatured = async (req, res) => {
    try {
        const { product } = req.body;

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product is required!'
            });
        }

        const isProductExist = await Product.findById(product);

        if (!isProductExist) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }

        const isProductExistInFeatured = await Featured.findOne({ product: product });

        if (isProductExistInFeatured) {
            await isProductExistInFeatured.deleteOne();
            return res.status(200).json({
                success: true,
                message: 'Removed from featured successfully!'
            });
        }

        const newFeatured = new Featured({
            product,
            user: req.user.id
        });

        await newFeatured.save();

        return res.status(201).json({
            success: true,
            message: 'Added to featured successfully!',
            newFeatured
        });

    } catch (err) {
        console.error(`Create Featured Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}

export const getAllFeatured = async (req, res) => {
    try {
        const allFeatureds = await Featured.find()
            .populate({
                path: 'product',
                populate: { path: 'category' }
            });

        if (!allFeatureds || allFeatureds.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No featured products found!',
                count: 0,
                featured: []
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Featured products retrieved!',
            count: allFeatureds.length,
            featured: allFeatureds
        });

    } catch (err) {
        console.error(`Get All Featured Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}