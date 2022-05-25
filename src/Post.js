import { Avatar } from '@material-ui/core'
import PublishIcon  from '@material-ui/icons/Publish'
import ChatBubbleOutlineIcon  from '@material-ui/icons/ChatBubbleOutline'
import VerifiedUserIcon  from '@material-ui/icons/VerifiedUser'
import RepeatIcon from '@material-ui/icons/Repeat'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Comments from './comments/Comments'
import React, { useState } from 'react'
import './Post.css'

function Post({id, text, pName='Username', pUserId, image_url, currentUserId, currentUsername, deletePost, status, handleRetweet}) {
  const [showComments, setShowComments] = useState(false);
  const [retweet, setRetweet] = useState(false);

  const handleShowComments = () => {
    if (showComments) {
      setShowComments(false)
    } else {
      setShowComments(true)
    }
  };

  const handleRetweetBtn = () => {
    if (retweet) {
      setRetweet(false)
    } else {
      setRetweet(true)
    }

    handleRetweet(id, retweet);
  }

  return (
    <div>
      <div className = "post">
        <div className = "post__avatar">
          <Avatar />
        </div>
        <div className = "post__body">
          <div className = "post__header">
            <div className = "post__headerText">
              <h3>
                {pName}
                <span className = "post__headerSpecial">
                  {true && <VerifiedUserIcon className = "post__badge" />}
                  @{pName}
                  {status === "LOGGED_IN" && pUserId === currentUserId && <DeleteOutlineIcon onClick={() => {deletePost(id)}} className='float-left'/>}
                </span>
              </h3>
            </div>
            <div className = "post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <img 
              src = {image_url}
              alt = ""
          />
          <div className = "post__footer">
            {status === "LOGGED_IN" && <ChatBubbleOutlineIcon fontSize = "small" className='cur-p' onClick={handleShowComments} /> }
            {status === "NOT_LOGGED_IN" && <ChatBubbleOutlineIcon fontSize = "small" className='cur-p' />}
            {status === "LOGGED_IN" && <RepeatIcon fontSize = "small" onClick={handleRetweetBtn} className='cur-p' />}
            {status === "NOT_LOGGED_IN" && <RepeatIcon fontSize = "small" className='cur-p' />}
            <FavoriteBorderIcon fontSize = "small" />
            <PublishIcon  fontSize = "small" /> 
          </div>
        </div>
      </div>
      {showComments && <Comments post_id={id} currentUserId={currentUserId} currentUsername={currentUsername} />} 
    </div>   

  )
}

export default Post;