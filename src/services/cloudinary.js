import axios from 'axios';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/drac9ko3l/image/upload';
const UPLOAD_PRESET = 'huyenmenh_preset';

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.secure_url;
    } catch (error) {
        console.error('Lỗi tải ảnh lên Cloudinary:', error);
        throw new Error('Lỗi khi tải ảnh lên tiên giới');
    }
};