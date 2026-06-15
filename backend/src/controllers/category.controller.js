import Category from '../models/category.model.js';
import Product from '../models/product.model.js';

export const createCategory = async (req, res) => {
    try {
        const { name, isActive, createdBy } = req.body;

        if (!name || isActive === undefined || !createdBy) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            });
        }

        const isCategoryExist = await Category.findOne({
            name: { $regex: `^${name}$`, $options: 'i' }
        });

        if (isCategoryExist) {
            return res.status(400).json({
                success: false,
                message: 'Category with this name already exists!'
            });
        }

        const newCategory = new Category({
            name,
            isActive,
            createdBy
        });

        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: 'Category Created!',
            category: newCategory
        });

    } catch (err) {
        console.error(`Category Creation Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found!'
            });
        }

        const productsCount = await Product.countDocuments({ category: id });

        if (productsCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete category! This category contains ${productsCount} active products. Please delete or reassign those products first.`
            });
        }

        await Category.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Category Deleted Successfully!'
        });

    } catch (err) {
        console.error(`Category Deletion Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}