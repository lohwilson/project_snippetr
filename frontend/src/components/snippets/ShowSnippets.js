import React, { Component } from 'react'

export class ShowSnippets extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: null
    }
  }
  componentDidMount(){
    console.log(this.props);
    let id = this.props.match.params.post_id;
    this.setState({
      id: id
    })
  }
  render() {
    return (
      <div>
        <h1>{this.state.id}</h1>
      </div>
    )
  }
}

export default ShowSnippets
