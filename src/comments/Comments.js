import React, { useEffect, useState } from 'react'
import Comment from './Comment';
import CommentForm from './CommentForm';
import axios from 'axios';
import './Comments.css';

function Comments({post_id, currentUserId, currentUsername}) {

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => (backendComment.parent_id === null && backendComment.post_id === post_id)
  );

  const getReplies = (commentId) =>
  backendComments
    .filter((backendComment) => ( backendComment.parent_id === commentId && backendComment.post_id === post_id ))
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

  const addComment = (text, parentId) => {
    axios
      .post('http://localhost:3001/comments',
       {
        comment: 
          {
            body: text,
            username: currentUsername,
            parent_id: parentId,
            user_id: currentUserId,
            post_id: post_id,
          }
        },
        {
          withCredentials: true
        }
     )
     .then((comment) => {
      setBackendComments([comment.data, ...backendComments]);
      setActiveComment(null);
     });
  };

  const getComments = () => {
    axios
    .get('http://localhost:3001/comments',
      {withCredential: true}
    )
    .then(response => {
      setBackendComments(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      axios.delete('http://localhost:3001/comments/' + commentId,
        {withCredentials: true}
      )
      .then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    getComments();
  }, [])

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  )
}

export default Comments;