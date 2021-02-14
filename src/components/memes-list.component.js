import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Card, Button,CardDeck} from 'react-bootstrap';


const Meme = props => (
  <div>
    <Card style={{ width: '18rem', margin: '2rem' }}>
    <Card.Header>👾 {props.meme.username}</Card.Header>
      <Card.Img variant="top" src={props.meme.image} />
      <Card.Body>
        <Card.Title>💓 {props.meme.likes}</Card.Title>
        <Card.Text>{props.meme.description}</Card.Text>
        <Card.Link href="#" onClick={() => { props.updateLikes(props.meme._id) }}>Like</Card.Link>
        <Card.Link href={"/edit/" + props.meme._id}>Edit</Card.Link>
        <Card.Link href="#" onClick={() => { props.deleteMeme(props.meme._id) }}>Delete</Card.Link>
      </Card.Body>
      <Card.Footer className="text-muted">{props.meme.date.substring(0,10)}</Card.Footer>
    </Card>
  </div>
)

export default class MemesList extends Component {
  constructor(props) {
    super(props);

    this.deleteMeme = this.deleteMeme.bind(this)

    this.state = {memes: [],
      username: '',
      description: '',
      date: new Date(),
      users: [],
      likes: 0,
      image: ''
    };
  }

  componentDidMount() {
    axios.get('https://meme-sheme.herokuapp.com/memes/')
      .then(response => {

        var memesList = []

        response.data.map(resp => {
          memesList = [resp, ...memesList]
        })
        this.setState({ memes: memesList })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteMeme(id) {
    axios.delete('https://meme-sheme.herokuapp.com/memes/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      memes: this.state.memes.filter(el => el._id !== id)
    })
  }

  updateLikes(id){

    console.log('here')

    axios.get('https://meme-sheme.herokuapp.com/memes/' + id)
    .then(function(response){

      const meme = {
        username: response.data.username,
        description: response.data.description,
        date: new Date(response.data.date),
        likes: response.data.likes + 1,
        image: response.data.image
      }
      console.log(meme);
      axios.post('https://meme-sheme.herokuapp.com/memes/update/' + id, meme)
      .then(res => console.log(res.data));

    }).catch(function (error) {
      console.log(error);
    })
  }

  memeList() {
    

    return this.state.memes.map(currentmeme => {
      return <Meme meme={currentmeme} deleteMeme={this.deleteMeme} updateLikes={this.updateLikes} key={currentmeme._id}/>;
    })
  }

  render(){
    return (
      <div>
        <h3>Meme Feed 🔊</h3>
        <hr/>
        <br/>
          <CardDeck>
            { this.memeList() }
          </CardDeck>
      </div>
    )
  }
}