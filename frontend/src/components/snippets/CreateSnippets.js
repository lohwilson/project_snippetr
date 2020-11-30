import React, { Component } from "react";
import axios from "axios";

export class CreateSnippets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      story: "",
      image: "",
      previewSource: "",
    };
  }

  componentDidMount() {
    console.log("create snippet component mounted");
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  createNewSnippet = (event) => {
    event.preventDefault();
    console.log("clicked");

    const snippet = {
      title: this.state.title,
      story: this.state.story,
      image: this.state.image,
    };

    console.log(snippet.image);
    // this.previewFile(snippet.image)

    axios
      .post("http://localhost:4000/snippetr/create", snippet)
      .then((res) => console.log(res.data))
      .then(() => {
        this.setState({
          title: "",
          story: "",
          image: "",
        });
      });
    console.log("snippet created");
  };

  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        previewSource: reader.result,
      });
    };
  };

  render() {
    return (
      <div>
        <form onSubmit={this.createNewSnippet}>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
              autoComplete="off"
              className="form-control col-6"
            />
            <label htmlFor="story">
              Story:
              <textarea
                id="story"
                value={this.state.story}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label htmlFor="image">Image: </label>
            <input
              type="file"
              id="image"
              value={this.state.image}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create New Snippet"
              className="btn btn-primary"
            />
          </div>
        </form>

        <div>
          {this.state.previewSource && (
            <img
              src={this.state.previewSource}
              alt="img"
              style={{ height: "300px", width: "300px" }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default CreateSnippets;
