import dotenv from 'dotenv';
dotenv.config();
import { ImageKit } from "@imagekit/nodejs";

const publicKey = process.env.IMAGE_KIT_PUBLIC_KEY;
const privateKey = process.env.IMAGE_KIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

const client = new ImageKit({
    // publicKey: `${publicKey}`,
    privateKey: `${privateKey}`,
    // urlEndpoint: `${UrlEndpoint}`,
});

const imageUploader = async (file) => {
    try {
        const result = await client.files.upload({
            file: file,
            fileName: `image_${Date.now()}`,
            folder: '/E-Commerce-Store-Practice'
        });
        return result;
    } catch (error) {
        console.error("ImageKit upload error: ❌", error);
        throw error;
    }
}

export default imageUploader;