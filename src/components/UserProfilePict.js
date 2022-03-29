import React from 'react';
import base from '../asset/rickroll-roll.gif';

function UserProfilePict(props) {
    return (
        <React.Fragment>
            {props.user.imgURL === "" || props.user.imgURL === undefined ? (
                <center>
                    <img src={base} className="profileIMG rounded-circle"></img>
                </center>
            ) : (
                <center>
                    <img src={props.user.imgURL} className="profileIMG rounded-circle"></img>
                </center>
            )}
            <h4 align="center">{props.user.username}</h4>
        </React.Fragment>
    );
    
}

export default UserProfilePict;