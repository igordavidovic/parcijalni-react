import './App.css';
import React from 'react';
import RepositoryList from './RepositoryList';
import UserInfo from './UserInfo';

export default class App extends React.Component {

  get #apiBase() {
    return 'https://api.github.com/users';
  }

  constructor() {
    super();

    this.state = {
      userInfo: null,
      repositories: [],
      searchValue: '',
      showValues: false
    };
  }

  #fetchUserInfo(value) {
    return fetch(`${this.#apiBase}/${value}`).then((response) => {
      return response.json();
    });
  }

  #fetchUserRepositories(value) {
    return fetch(`${this.#apiBase}/${value}/repos`).then((response) => {
      return response.json();
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const searchVal = this.state.searchValue;

    Promise.all([this.#fetchUserInfo(searchVal), this.#fetchUserRepositories(searchVal)]).then((results) => {
      this.setState({ userInfo: results[0], repositories: results[1], showValues: true });
    }).catch(
      (reason) => {
        alert(reason);
      }
    );
  }

  handleChange(e) {
    const newVal = e.target.value;

    this.setState({ searchValue: newVal });
  }

  resetView() {
    this.setState({ userInfo: null, repositories: [], searchValue: '', showValues: false });
  }

  render() {
    return (
      <div className="App">
        {!this.state.showValues && <form onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label htmlFor="name" className="Control">Github username:</label>
            <input id="name"
              className="Control Control-Padding"
              type="text"
              value={this.state.searchValue}
              onChange={(e) => this.handleChange(e)} />
            <button className="Control Control-Padding" type="submit">GO!</button>
          </div>
        </form>}
        {this.state.showValues &&
          <div style={{ marginTop: '10px' }}>
            <UserInfo avatar_url={this.state.userInfo.avatar_url}
              name={this.state.userInfo.name}
              bio={this.state.userInfo.bio}
              location={this.state.userInfo.location}></UserInfo>
            <div>
              <p className="User-Group-Title"><b>Repositories</b></p>
              <RepositoryList repositories={this.state.repositories}></RepositoryList>
            </div>
            <button className="Control Control-Padding Reset-Btn"
              onClick={() => this.resetView()}>Reset</button>
          </div>
        }
      </div>
    );
  }
}
