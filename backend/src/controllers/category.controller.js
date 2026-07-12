import Category from '../models/category.model.js';
import Product from '../models/product.model.js';

export const createCategory = async (req, res) => {
    try {
        const { name, isActive } = req.body;

        if (!name || isActive === undefined) {
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
                message: 'Category name already exists!'
            });
        }

        const newCategory = new Category({
            name,
            isActive,
            createdBy: req.user.id
        });

        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: 'Category created successfully!',
            category: newCategory
        });

    } catch (err) {
        console.log(`Category creation error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
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
                message: `Cannot delete category. It contains ${productsCount} active products!`
            });
        }

        await Category.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully!'
        });

    } catch (err) {
        console.log(`Category deletion error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, isActive } = req.body;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found!'
            });
        }

        let updatedCategoryData = { ...req.body };

        if (name && name.toLowerCase() !== category.name.toLowerCase()) {
            const duplicateCheck = await Category.findOne({
                _id: { $ne: id },
                name: { $regex: `^${name}$`, $options: 'i' }
            });

            if (duplicateCheck) {
                return res.status(400).json({
                    success: false,
                    message: 'Category name already exists!'
                });
            }
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updatedCategoryData,
            { returnDocument: 'after', runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully!',
            category: updatedCategory
        });

    } catch (err) {
        console.log(`Category updating Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().select('-createdBy');

        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No categories found!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Categories retrieved successfully!',
            count: categories.length,
            categories
        });

    } catch (err) {
        console.error(`Get All Categories Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again!'
        });
    }
}