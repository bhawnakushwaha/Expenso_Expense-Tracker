// import { API_PATHS } from "./apiPaths";
// import axiosInstance from "./axiosInstance";

// const uploadImage = async (imageFile) => {
//     const formData = new FormData();
//     // append images file to form data
//     formData.append('image', imageFile);

//     try {
//         const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data', // headers to upload file
//             },
//         });
//         return response.data;

//     } catch (error) {
//         console.error('Error uploading in the image: ', error);
//         throw error;
//     }
// };

// export default uploadImage;


import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(
            API_PATHS.IMAGE.UPLOAD_IMAGE,
            formData,
            {
                headers: {
                    // ❗ Do NOT manually set multipart/form-data
                    // Axios will handle boundaries automatically
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error.response?.data || error);
        throw error;
    }
};

export default uploadImage;
