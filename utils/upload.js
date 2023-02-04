import axios from "axios";

export const uploadCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "uploads");
  const { data } = await axios(
    "https://api.cloudinary.com/v1_1/dowqgsk2j/image/upload",
    { method: "post", data: formData }
  );
  return { url: data?.secure_url };
};
