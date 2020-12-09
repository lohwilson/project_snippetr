import React, { Component } from "react";
import styled from "styled-components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

export class SnippetBody extends Component {
  render() {
    const {
      image,
      likes,
      id,
      title,
      story,
      checkedLike,
      unLikeSnippet,
      likeSnippet,
    } = this.props;
    return (
      <div>
        <div>
          <Image src={image} alt="userImage" />
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={likes && checkedLike(likes)}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="likes"
              onChange={() =>
                checkedLike(likes) ? unLikeSnippet(id) : likeSnippet(id)
              }
            />
          }
        />
        {likes && <span>{likes.length} likes</span>}
        <h1>{title}</h1>
        <h3>{story}</h3>
      </div>
    );
  }
}

export default SnippetBody;

const Image = styled.img`
  max-width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
`;
