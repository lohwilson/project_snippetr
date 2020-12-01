import React, { Component } from "react";
import axios from "axios";

export class CreateSnippets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      story: "",
      image: ""
    };
  }

  componentDidMount() {
    console.log("create snippet component mounted");
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleImageChange = (event) => {
    this.setState({ image: event.target.files[0] })
  }

  createNewSnippet = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("file", this.state.image);
    data.append("upload_preset", "snippetr");
    data.append("cloud_name", "drfrooljx");

    const response = await fetch("https://api.cloudinary.com/v1_1/drfrooljx/image/upload", {
      method: "post",
      body: data,
    })
    const result = await response.json();
    await this.setState({
      image: result.url
    })
    console.log(result);


    const snippet = {
      title: this.state.title,
      story: this.state.story,
      image: this.state.image,
    };

    console.log(snippet);

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

  postDetails = () => {
    const data = new FormData();
    data.append("file", this.state.image);
    data.append("upload_preset", "snippetr");
    data.append("cloud_name", "drfrooljx");
    fetch("https://api.cloudinary.com/v1_1/drfrooljx/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          image: data.image
        })
        console.log(data.image);
      })
      .catch((err) => {
        console.log(err);
      });
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
              onChange={this.handleImageChange}
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
      </div>
    );
  }
}

export default CreateSnippets;
