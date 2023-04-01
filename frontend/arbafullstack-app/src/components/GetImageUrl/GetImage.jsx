import React from 'react'
import axios from "axios"

// This function takes in a selected image, uploads it to Cloudinary and returns the secure URL of the uploaded image
const GetImage = async (selectedImage) => {
  try {
    // Create a new FormData object to hold the selected image
    const formData = new FormData();
    // Append the selected image to the FormData object
    formData.append("file", selectedImage);
    // Append the upload preset to the FormData object
    formData.append("upload_preset", "gr7800");
    // Define a variable to hold the response data
    let data;
    // Use Axios to make a POST request to Cloudinary's image upload API
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dmb6cupsg/image/upload",
      formData
    );
    // Retrieve the secure URL of the uploaded image from the response data
    data = response.data.secure_url;
    // Log the secure URL of the uploaded image to the console
    console.log(data);
    // Return the secure URL of the uploaded image
    return data;
  } catch (error) {
    // Log any errors to the console
    console.log(error)
  }
}

// Export the GetImage function as the default module
export default GetImage
