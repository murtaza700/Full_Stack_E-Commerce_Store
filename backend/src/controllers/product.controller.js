import ImageKit from '@imagekit/nodejs';

import Product from '../models/product.model.js';
import Category from '../models/category.model.js';
import imageUploader from '../utils/imageUploader.js';
import imageDelete from '../utils/imageDelete.js';

export const createProduct = async (req, res) => {
    try {
        const { title, description, price, category, stock, outOfStock, ratings, sku, createdBy } = req.body;
        const file = req.file;

        if (!title || !description || !price || !category || !stock) {
            return res.status(401).json({
                success: false,
                message: 'All fields are required!'
            });
        }

        if (!file) {
            return res.status(401).json({
                success: false,
                message: 'Product Image is required!'
            });
        }

        const result = await imageUploader(file.buffer.toString('base64'));

        const newProduct = new Product({
            title,
            description,
            image: { url: result.url, fileId: result.fileId },
            price,
            category,
            stock,
            outOfStock,
            ratings,
            sku,
            createdBy
        });

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: 'Product Created!',
            product: newProduct
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server Error!!!'
        });
    }
}

export const updateProduct = async (req, res) => {
    try {

        const updatedData = { ...req.body };

        const oldProduct = await Product.findById(req.params.id);

        if (!oldProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }


        if (req.file) {
            const result = await imageUploader(req.file.buffer.toString('base64'));

            updatedData.image = {
                url: result.url,
                fileId: result.fileId
            };

            if (oldProduct.image && typeof oldProduct.image === 'object' && oldProduct.image.fileId) {
                imageDelete(oldProduct.image.fileId);
            }

        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { returnDocument: 'after', runValidators: true }
        ).populate('category', '-_id -createdBy -createdAt -updatedAt');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }

        console.log(product);

        console.log('!!!!!!!', req.params.id, req.body,);


        return res.status(200).json({
            success: true,
            message: 'Product updated!',
            product
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not found!'
            });
        }

        if (product.image && product.image.fileId) {
            imageDelete(product.image.fileId);
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Product Deleted!'
        });

    } catch (err) {
        console.error(`Product Delete Error!: ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category', '-_id -createdBy -createdAt -updatedAt');
        return res.status(200).json({
            success: true,
            message: 'Products fetched!',
            count: products.length,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', '-_id -createdBy -createdAt -updatedAt');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product Found!',
            product
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }

}

export const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category }).populate('category', '-_id -createdAt -updatedAt -createdBy');

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No products found for this category!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Products found!',
            count: products.length,
            products
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server Error!"
        });
    }
}