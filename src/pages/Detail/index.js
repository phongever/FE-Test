import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../utils/api";
import { formatDate } from "../../utils/helpers";
import { Spinner, Button } from "../../components";
import { Link } from "react-router-dom";
import "./style.css";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  const fetchPost = async (id) => {
    setLoading(true);
    const post = await getPostById(id);

    setPost(post);
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
        <div className="blog-detail">
          <div className="d-flex justify-content-end">
            <Link to={`/${id}/edit`}>
              <Button className="btn-outline-primary">Edit post</Button>
            </Link>
          </div>
          <div>
            <h1>{post.title}</h1>
            <p>{formatDate(new Date(post.createdAt))}</p>
            <p className="pre-wrap">{post.content}</p>
            {post.image !== "" && (
              <img className="w-100" src={post.image} alt={post.title} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
