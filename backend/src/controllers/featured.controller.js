import Featured from "../models/featured.model.js";
import Product from "../models/product.model.js";

export const toggleFeatured = async (req, res) => {
    try {
        const { product } = req.body;

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product ID required!'
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
                message: 'Product removed from featured!'
            });
        }

        const newFeatured = new Featured({
            product,
            user: req.user.id
        });

        await newFeatured.save();

        return res.status(201).json({
            success: true,
            message: 'Product added to featured!',
            newFeatured
        });

    } catch (err) {
        console.error(`Create Featured Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const getAllFeatured = async (req, res) => {
    try {
        const allFeatureds = await Featured.find()
            .populate('product');

        if (!allFeatureds || allFeatureds.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Nothin in featured!',
                count: 0,
                featured: []
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Featured found!',
            count: allFeatureds.length,
            featured: allFeatureds
        });

    } catch (err) {
        console.error(`Get All Featured Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}