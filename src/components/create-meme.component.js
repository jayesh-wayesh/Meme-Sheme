import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



export default class Creatememe extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      date: new Date(),
      users: [],
      image: '',
      likes: 0
    }
  }

  componentDidMount() {

      axios.get('https://meme-sheme.herokuapp.com/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeImage(e){
    this.setState({
      image: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const meme = {
      username: this.state.username,
      description: this.state.description,
      date: this.state.date,
      likes: this.state.likes,
      image: this.state.image
    }

    var img = new Image();
    img.onload = function(){     console.log(meme);

      axios.post('https://meme-sheme.herokuapp.com/memes/add/', meme)
        .then(res => console.log(res.data));
  
      window.location = '/';
    }; 
    
    img.onerror = function(){ alert("bad"); };
    img.src = meme.image;
        
  }

  render() {
    return (
      <div>
        <h3>➕ Add Meme</h3>
        <hr/>
        <br/>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Meme url: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.image}
                onChange={this.onChangeImage}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Add meme" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}