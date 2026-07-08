import sharp from 'sharp';

const convertToWebpBuffer = async (rawMulterBuffer) => {
    try {
        if (!rawMulterBuffer) throw new Error("Null matrix input buffer transmitted into sharp corridor.");

        const optimizedWebpBuffer = await sharp(rawMulterBuffer)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();

        return optimizedWebpBuffer;
    } catch (error) {
        console.error("Sharp WebP processing pipeline exception error: ❌", error);
        throw error;
    }
};

export default convertToWebpBuffer;