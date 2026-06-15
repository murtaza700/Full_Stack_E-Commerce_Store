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

export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, isActive } = req.body;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category Not Found!'
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
                    message: 'A category with this name already exists!'
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
            message: 'Category Updated!',
            category: updatedCategory
        });

    } catch (err) {
        console.error(`Category Updation Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().select('-createdBy');

        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Categories not found!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Categories fetched!',
            categories
        });

    } catch (err) {
        console.error(`Get All Categories Error! ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}