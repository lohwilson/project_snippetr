import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Snippets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippet: {
        title: "",
        story: "",
        image: "",
      },
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    const id = this.props.match.params.id;
    axios.get("http://localhost:4000/snippetr/" + id).then((res) => {
      console.log(res.data);
      this.setState({
        snippet: res.data,
      });
    });
  }
  
  handleDelete = async () => {
    console.log('delete snippet');
    console.log(this.props);
    const id = this.props.match.params.id;

    await axios.delete("http://localhost:4000/snippetr/"+ id)
    console.log('deleted', id);
    this.props.history.push('/dashboard')

  }

  handleEdit = () => {
    console.log('edit snippet');
  }

  render() {
    const { title, story, image } = this.state.snippet;
    return (
      <div className="container">
        <div>
          <h1>{title}</h1>
          <h3>{story}</h3>
          <img src={image} alt="userImage" />
        </div>
        <button onClick={this.handleDelete}>Delete</button>
        <button onClick={this.handleEdit}>Edit</button>

        <Link to="/dashboard" className="nav-link">
          Back
        </Link>
      </div>
    );
  }
}

export default Snippets;
