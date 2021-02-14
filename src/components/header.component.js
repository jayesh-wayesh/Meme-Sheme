import {Jumbotron, Navbar, Nav,Form,FormControl,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Top(){
    return (
        <Jumbotron style={{color: "gray", background: "black", margin: "0rem", width: "auto", paddingBottom: "16px"}}>
                <div className="container">
            
            <p>XMeme's</p>
            <h1 style={{color : "#fff" }}>Meme Sheme                 👁️👄👁️</h1>
            <p>
                Whether you are a Meme Newbie or a Meme Lord, Meme Sheme is the place where you can watch and share memes
            </p>
            <br/>
            <br/>
            <Navbar bg="black" variant="dark" style={{margin: "0rem"}}>
                {/* <Navbar.Brand href="/"> Meme Feed 🔊 </Navbar.Brand> */}
                <Nav className="mr-auto">
                <Nav.Link href="/">🔊 Meme Feed   </Nav.Link>
                <Nav.Link href="/create">➕ Add Meme   </Nav.Link>
                <Nav.Link href="/user">👋 Add User   </Nav.Link>
                </Nav>
            </Navbar>
            </div>
        </Jumbotron>
    )
}