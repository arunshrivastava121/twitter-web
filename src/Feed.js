import React, {useEffect, useState} from 'react';
import './Feed.css';
import TweetBox from './TweetBox'
import Post from './Post';
import axios from 'axios';

function Feed({currentUserId, currentUsername, status}) {
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState('');

  const handleSuccessfulTweet = (data) => {
    setPosts([data.data, ...posts]);
  };

  const getAllPosts = () => {
    axios
      .get(
        'http://localhost:3001/posts',
        {withCredentials: true}
      )
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => {
        console.log("posts error", error);
      })
  }

  const deletePost = (postId) => {
    axios
      .delete(
        'http://localhost:3001/posts/' + postId,
        {withCredentials: true}
      )
      .then(() => {
        const updatedBackendPosts = posts.filter(
          (backendPost) => backendPost.id !== postId
        );
        setPosts(updatedBackendPosts);
      })
      .catch(error => {
        console.log("Delete Post Error:", error);
      })
  }

  const handleRetweet = (postId, retweetState) => {
    if (retweetState) {
      axios
      .delete('http://localhost:3001/posts/'+postId+'/destroy_retweet',
        {
          withCredentials: true
        }
      )
      .then((response => {
        const updatedBackendPosts = posts.filter(
          (backendPost) => backendPost.id !== postId
        );
        setPosts([response.data, ...updatedBackendPosts]);
      }))
      .catch(error => {
        console.log(error);
      })

    } else {
      axios
      .get('http://localhost:3001/posts/'+postId+'/retweet',
        {
          withCredentials: true
        }
      )
      .then((response => {
        const updatedBackendPosts = posts.filter(
          (backendPost) => backendPost.id !== postId
        );
        setPosts([response.data, ...updatedBackendPosts]);
      }))
      .catch(error => {
        console.log(error);
      })
    }
  }

  useEffect(() => {
    getAllPosts();
  }, [])

  return (
    <div className = "feed">
      <div className = "feed__header">
        <h2>Home</h2>
        <form className='nosubmit'>
          <input type="search" className='nosubmit' placeholder="Search..." onChange={(event) => {setSearchResult(event.target.value)}} />
          <span>
            <i className='fas fa-search'></i>
          </span>
        </form>
      </div>

      {status === "LOGGED_IN" && <TweetBox handleSuccessfulTweet={handleSuccessfulTweet} currentUserId={currentUserId} currentUsername={currentUsername} />}
      {posts.filter((item) => {
          if (searchResult === "") {
            return item;
          } else if (item.text.toLowerCase().includes(searchResult.toLowerCase())) {
            return item;
          }
          return false;
      }).map((post) => (
        <Post
          key={post.id} 
          id={post.id}
          text={post.text} 
          pName={post.username}
          pUserId={post.user_id}
          image_url={post.image_url}
          currentUserId={currentUserId}
          currentUsername={currentUsername}
          deletePost={deletePost}
          handleRetweet={handleRetweet}
          status={status}
        />
      ))}
    </div>
  )
}

export default Feed;