import ImageKit from "@imagekit/nodejs";

const privateKey = process.env.IMAGE_KIT_PRIVATE_KEY

const imagekit = new ImageKit({
    privateKey: `${privateKey}`
});

const imageDelete = async (fileId) => {
    try {
        imagekit.files.delete(fileId);
        console.log(console.log(`ImageKit Image Deleted!`));

    } catch (err) {
        console.error(`ImageKit Image Deletion Error! ${err}`);
    }
}

export default imageDelete;