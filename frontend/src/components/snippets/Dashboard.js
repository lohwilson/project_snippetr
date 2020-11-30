import React, { Component } from 'react'
import CreateSnippets from './CreateSnippets'
import ListAllSnippets from './ListAllSnippets'
import Search from './Search';
import Profile from '../user/Profile';
import styled from 'styled-components';

const Div = styled.div`

`;

export class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      listAll: true,
      create: false,
      search: false,
      profile: false,
    }
  }

  listAllSnippets = () => {
    console.log('list all');
    this.setState({
      listAll: true,
      create: false,
      search: false,
      profile: false,
    })
  }

  createSnippets = () => {
    console.log('create');
    this.setState({
      listAll: false,
      create: true,
      search: false,
      profile: false,
    })
  }

  search = () => {
    console.log('search');
    this.setState({
      listAll: false,
      create: false,
      search: true,
      profile: false,
    })
  } 

  profile = () => {
    console.log('profile');
    this.setState({
      listAll: false,
      create: false,
      search: false,
      profile: true,
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div>
            <button onClick={this.listAllSnippets}>List All Snippets</button>
            <button onClick={this.createSnippets}>Create Snippet</button>
            <button onClick={this.search}>Search</button>
            <button onClick={this.profile}>Your Profile</button>
          </div>
          <div>
            {this.state.listAll && <ListAllSnippets/>}
            {this.state.create && <CreateSnippets/>}
            {this.state.search && <Search/>}
            {this.state.profile && <Profile/>}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
