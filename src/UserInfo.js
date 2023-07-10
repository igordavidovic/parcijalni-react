import './App.css';
import React from 'react';
import { PropTypes } from 'prop-types';

class UserInfo extends React.Component {
    render() {
        return (
            <div>
                <div className='User-Container'>
                    <img className='User-Avatar' src={this.props.avatar_url} alt="User avatar" />
                    <span className='User-Name'>{this.props.name}</span>
                </div>
                <p className="User-Group-Title"><b>Bio: </b>{this.props.bio}</p>
                <p className="User-Group-Title"><b>Location: </b>{this.props.location}</p>
            </div>
        );
    }
}

UserInfo.propTypes = {
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    location: PropTypes.string
}

export default UserInfo;
