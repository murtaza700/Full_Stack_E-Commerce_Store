import Slider from "../models/slider.model.js";
import imageUploader from '../utils/imageUploader.js';
import imageDelete from '../utils/imageDelete.js';
import webpConverter from '../utils/webpConverter.js';

export const getAllSliders = async (req, res) => {
    try {
        const structuralSlidersList = await Slider.find({}).sort({ orderPosition: 1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: 'Sliders found!',
            sliders: structuralSlidersList
        })

    } catch (err) {
        console.log(`Get all sliders Error! `, err);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        })
    }
}

export const createSliderAdmin = async (req, res) => {
    try {
        const { title, subtitle, link, orderPosition } = req.body;
        const file = req.file;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required!'
            })
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'Background Image is required!'
            })
        }

        const convertImage = await webpConverter(file.buffer);
        const base64 = convertImage.toString('base64')

        const result = await imageUploader(base64);

        const newSlider = new Slider({
            title,
            subtitle,
            link,
            orderPosition: Number(orderPosition) || 0,
            image: { url: result.url, fileId: result.fileId }
        })

        await newSlider.save();

        return res.status(201).json({
            success: true,
            message: 'Slider Created!',
            slider: newSlider
        });

    } catch (err) {
        console.log(`Create Slider Error! `, err);
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        })
    }
}

export const updateSliderAdmin = async (req, res) => {
    try {
        const data = { ...req.body }
        const file = req.file;
        const oldSlider = await Slider.findById(req.params.id);

        if (!oldSlider) {
            return res.status(404).json({
                success: false,
                message: 'Slider not found!'
            })
        }

        if (file) {
            const convertImage = await webpConverter(file.buffer)
            const base64 = await convertImage.toString('base64')
            const result = await imageUploader(base64)

            data.image = { url: result.url, fileId: result.fileId }

            if (oldSlider.image?.fileId) {
                await imageDelete(oldSlider.image.fileId)
            }
        }

        const updateSlider = await Slider.findByIdAndUpdate(
            req.params.id,
            data,
            { returnDocument: 'after', runValidators: true }
        )

        return res.status(200).json({
            success: true,
            message: 'Slider updated!',
            slider: updateSlider
        })

    } catch (err) {
        console.log(`Error while updting slider! `, err)
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        })
    }
}

export const deleteSliderAdmin = async (req, res) => {
    try {
        const slider = await Slider.findById(req.params.id)

        if (!slider) {
            return res.status(404).json({
                success: false,
                message: 'Target profile reference manifest not found'
            });
        }

        if (slider?.image?.fileId) {
            await imageDelete(slider.image.fileId)
        }

        await slider.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Slider deleted!'
        });

    } catch (err) {
        console.log(`Error while deleting slider! `, err)
        return res.status(500).json({
            success: false,
            message: 'Server Error!'
        })
    }
}