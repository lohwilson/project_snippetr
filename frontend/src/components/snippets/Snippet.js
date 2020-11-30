import axios from 'axios'
import React, { Component } from 'react'

export class Snippets extends Component {
  constructor(props){
    super(props)
    this.state = {
      snippet: {
        title: '',
        story: ''
      }
    }
  }

  componentDidMount(){
    console.log(this.props.match.params.id);
    const id = this.props.match.params.id;
    axios.get('http://localhost:4000/snippetr/'+ id)
    .then(res => {
      console.log(res.data)
      this.setState({
        snippet: res.data
      })
    })
  }

  render() {
    const { title, story } = this.state.snippet;
    return (
      <div>
        <h1>{title}</h1>
        <h3>{story}</h3>
      </div>
    )
  }
}

export default Snippets


