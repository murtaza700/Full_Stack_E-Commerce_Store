import Category from '../models/category.model.js';

export const createCategory = async (req, res) => {
    try {
        const { name, isActive, createdBy } = req.body;

        if (!name || !isActive || !createdBy) {
            return res.status(401).json({
                success: false,
                message: 'Name is required!'
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
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        });
    }
}