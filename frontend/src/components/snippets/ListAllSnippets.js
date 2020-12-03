import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


export class ListAllSnippets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: [],
    };
  }
  componentDidMount() {
    console.log("dashboard mounted");
    axios.get("http://localhost:4000/snippetr").then((res) => {
      console.log(res.data);
      this.setState({
        snippets: res.data,
      });
    });
  }

  toggleLikes = (id) => {
    console.log('toggling likes', id);
    console.log(this.state.snippets);
    const snippet = this.state.snippets.find(snippet => snippet._id === id)
    console.log(snippet);
    this.setState({})
  }

  render() {
    const { snippets } = this.state;
    const allSnippets = snippets.length ? (
      snippets.map((snippet) => {
        return (
          <div>
            <Link
              to={{
                pathname: "/snippet/" + snippet._id,
                snippet: snippet,
                key: snippet._id,
              }}
            >
              <span>{snippet.title}</span>
            </Link>
            <p>{snippet.story}</p>
            <img src={snippet.image} alt="userImage" />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name="likes"
                  onChange={() => this.toggleLikes(snippet._id)}
                />
              }
              label={snippet.likes}
            >{snippet.likes} likes</FormControlLabel>
          </div>
        );
      })
    ) : (
      <div> No post yet </div>
    );
    return (
      <div>
        <h1>List all snippets</h1>
        <div>{allSnippets}</div>
      </div>
    );
  }
}

export default ListAllSnippets;
