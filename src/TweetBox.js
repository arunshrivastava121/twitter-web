import React, { useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
import './TweetBox.css'
import axios from 'axios';

function TweetBox(props) {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = e => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/posts',
        {
          post: { 
             text: tweetMessage,
             image_url: tweetImage,
             verified: true,
             user_id: props.currentUserId,
             username: props.currentUsername,
           }
        },
        { withCredentials: true}
      )
      .then(response => {
        if (response.status === 201) {
          props.handleSuccessfulTweet(response);
        }
      })
      .catch(error => {
        console.log("post error", error);
      })

    setTweetMessage("")
    setTweetImage("")
  }

  return (
    <div className = "tweetBox">
      <form>
        <div className = "tweetBox__input">
          <Avatar
            src = "https://pbs.twimg.com/profile_images/1266938830608875520/f-eajIjB_400x400.jpg"
          />
          <input 
            onChange = {(e) => setTweetMessage(e.target.value)}
            value = {tweetMessage} 
            placeholder = "What's happening" 
            type = "text" 
          />
        </div>
        <input 
          onChange = { (e) => setTweetImage(e.target.value) }
          value = {tweetImage}
          className = "tweetBox__imageInput"
          placeholder = "Optional : Enter Image URL"
          type = "text"
        />
        <Button 
          onClick = { sendTweet }
          className = "tweetBox__tweetButton">Tweet
        </Button>
      </form>
    </div>    
  )
}

export default TweetBox;