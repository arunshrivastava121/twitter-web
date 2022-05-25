import React, { Component } from 'react'
import './Sidebar.css';
import './Home.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutLineIcon from '@mui/icons-material/MailOutlineOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SidebarOptions from './SidebarOptions';
import { Button } from '@material-ui/core';
import axios from 'axios';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLoginClickButton = this.handleLoginClickButton.bind(this);
    this.handleLogoutClickButton = this.handleLogoutClickButton.bind(this);
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", {withCredentials: true})
      .then(response => {
        this.props.handleLogout();
      }).catch(error => {
        console.log("logout error", error);
      })
  }

  handleLoginClickButton() {
    this.props.handleLogin();
  }

  handleLogoutClickButton() {
    this.props.handleLogout();
  }

  render() {
    return (
      <div className='sidebar'>
        <TwitterIcon className='sidebar__twitterIcon' />
        <SidebarOptions active Icon={HomeIcon} text="Home" />
        <SidebarOptions Icon={SearchIcon} text="Explore" />
        <SidebarOptions Icon={NotificationsNoneIcon} text="Notifications" />
        <SidebarOptions Icon={MailOutLineIcon} text="Message" />
        <SidebarOptions Icon={BookmarkIcon} text="BookMark" />
        <SidebarOptions Icon={ListAltIcon} text="Lists" />
        <SidebarOptions Icon={PermIdentityIcon} text="Profile" />
        <SidebarOptions Icon={MoreHorizIcon} text="More" />
        <Button className='sidebar__tweet' variant="outlined">Tweet</Button>
        {this.props.status === "LOGGED_IN" && <Button className='sidebar__logout' onClick={this.handleLogoutClick}>Logout</Button>}
        {this.props.status === "NOT_LOGGED_IN" && 
          <div className="form-actions">
            <button onClick={this.handleLoginClickButton}>Login</button><br></br>
            <button onClick={this.handleLogoutClickButton}>Sign Up</button>
          </div>
        }
      </div>
    )
  }
}

