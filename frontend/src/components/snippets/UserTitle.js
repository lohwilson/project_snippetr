import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export class UserTitle extends Component {
  render() {
    return (
      <div>
        <UserDiv>
          <Link
            to={{
              pathname: "/users/" + this.props.postedBy._id,
            }}
            style={styledUserLink}
          >
            <span>{this.props.postedBy.username}</span>
          </Link>
        </UserDiv>
      </div>
    );
  }
}

export default UserTitle;

const UserDiv = styled.div`
  font-size: 20px;
  font-weight: 900;
  margin: 20px;
`;

const styledUserLink = {
  color: "black",
  textDecoration: "none",
  textAlign: "left",
};
