import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class Editmeme extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      date: new Date(),
      users: [],
      image: ''
    }
  }

  componentDidMount() {
    axios.get('https://meme-sheme.herokuapp.com/memes/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          date: new Date(response.data.date),
          likes: response.data.likes,
          image: response.data.image
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

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
      })

  }

  onChangeImage(e){
    this.setState({
      image: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
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

    console.log(meme);

    axios.post('https://meme-sheme.herokuapp.com/memes/update/' + this.props.match.params.id, meme)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit meme Log</h3>
      <hr/>
      <br/>
      <form onSubmit={this.onSubmit}>
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
          <input type="submit" value="Update meme" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}