import React, { useState, useEffect } from "react";
import { Button, Spinner } from "../components";
import { uploadFile } from "../utils/firebase";
import { editPost, getPostById, deletePost } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [tempImage, setTempImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingButton(true);
    let url = post.image;

    if (url !== "" && typeof url !== "string") {
      url = await uploadFile(post.image);
    }

    await editPost(id, { ...post, image: url });

    navigate(`/${id}`);
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      setLoadingButton(true);
      await deletePost(id);
      navigate("/");
    }
  };

  const fetchPost = async (id) => {
    setLoading(true);
    const post = await getPostById(id);

    setPost(post);
    setTempImage(post.image);
    setLoading(false);
  };

  useEffect(() => {
    fetchPost(id);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
                    className="btn-outline-danger ml-2"
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
          <div className="d-flex gap-2">
            <Button
              type="button"
              className="w-50 btn-danger mr-2"
              disabled={loadingButton}
              onClick={handleDelete}
              data-toggle="modal"
              data-target="#modal"
            >
              Delete post
            </Button>
            <Button
              className="w-50 btn-primary"
              disabled={post.title === "" || loadingButton}
            >
              Update
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default Edit;
