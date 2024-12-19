import { toast } from "sonner";

const url = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;
const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!;

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 5MB

export const uploadImage = async (_files: File | File[]) => {
  try {
    if (!_files) return;

    const files: File[] =
      _files instanceof FileList
        ? Array.from(_files)
        : _files instanceof File
        ? [_files]
        : _files;

    const uploadResponses = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image must be less than 5MB");
        return null;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      uploadResponses.push(data);
    }

    return uploadResponses;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
