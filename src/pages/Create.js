import React, { useState } from "react";
import { Button } from "../components";
import { uploadFile } from "../utils/firebase";
import { createPost } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [tempImage, setTempImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url = post.image;

    if (url !== "") {
      url = await uploadFile(post.image);
    }

    const newPost = await createPost({ ...post, image: url });

    navigate(`/${newPost.id}`);
  };

  const handleChangeInput = (e) => {
    const input = e.target;

    setPost({ ...post, [input.name]: input.value });
  };

  const handleChangeFile = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const data = event.target.result;

      setTempImage(data);
      setPost({ ...post, image: file });
    };
    fileReader.readAsDataURL(file);
  };

  const deleteImage = () => {
    setTempImage("");
    setPost({ ...post, image: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            id="title"
            name="title"
            placeholder="Title"
            value={post.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="10"
            value={post.content}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <>
            <label htmlFor="image">Image</label>
            {tempImage !== "" ? (
              <div className="mb-3">
                <img className="w-25" src={tempImage} alt={post.title} />
                <Button
                  className="btn-outline-danger ms-2"
                  onClick={deleteImage}
                >
                  Delete image
                </Button>
              </div>
            ) : (
              <input
                className="form-control"
                type="file"
                id="image"
                accept="image/*"
                onChange={handleChangeFile}
              />
            )}
          </>
        </div>
        <div className="d-grid">
          <Button
            className="btn-primary btn-block"
            disabled={post.title === "" || loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Create;
