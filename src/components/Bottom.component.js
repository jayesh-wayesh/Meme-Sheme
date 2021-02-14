import React, {useState,useEffect} from 'react';
import {Jumbotron, Navbar, Nav,Form,FormControl,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Bottom(){

    return (
        <Jumbotron style={{color: "gray", background: "black", margin: "0rem", width: "auto", paddingBottom: "16px"}} className="text-center">
            <div className="container">
                <h2>🤔 But Why Memes ?</h2>
                <br/>
                <blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="en" dir="ltr">Who controls the memes,<br/>controls the Universe</p>&mdash; Elon Musk (@elonmusk) <a href="https://twitter.com/elonmusk/status/1276418907968925696?ref_src=twsrc%5Etfw">June 26, 2020</a>
                </blockquote> 
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
                <br/>
                <hr/>
                <div>Made for XMeme project by</div>
                <div><Link to="/twitter.com/jayesh_wayesh" className="nav-link">✨jayesh_wayesh</Link></div>        
            </div>
        </Jumbotron>
    )
}