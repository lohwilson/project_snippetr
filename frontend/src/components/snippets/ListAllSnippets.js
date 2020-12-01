import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

export class ListAllSnippets extends Component {
  constructor(props){
    super(props)
    this.state = {
      snippets: []
    }
  }
  componentDidMount(){
    console.log('dashboard mounted');
    axios.get('http://localhost:4000/snippetr')
      .then(res => {
        console.log(res.data)
        this.setState({
          snippets: res.data
        })
      })
  }

  render() {
    const { snippets } = this.state;
    const allSnippets = snippets.length ? (
      snippets.map(snippet => {
        return (
          <div>
            <Link to={{ pathname:'/snippet/' + snippet._id, snippet: snippet, key: snippet._id}} >
              <span>{snippet.title}</span>
            </Link>
            <p>{snippet.story}</p>
            <img src={snippet.image} alt="userImage"/>
          </div>
        )
      })
    ) : (
      <div> No post yet </div>
      )
    return (
      <div>
        <h1>List all snippets</h1>
        <div>
          {allSnippets}
        </div>
      </div>
    )
  }
}

export default ListAllSnippets
