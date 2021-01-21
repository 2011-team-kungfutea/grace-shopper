import React from 'react'
//import '../style/style.css'
import {Image, Segment} from 'semantic-ui-react'
//import {Link} from 'react-router-dom'
//import {Navbar} from '/navbar.js'

const Home = () => {
  //console.log('what is this')
  return (
    <div>
      {/* <div className="message">
        <h5 centered>
          Ready to WELCOME the love of an alien pet into your home? We're
          committed to matching wonderful, adoptable alien pets with loving
          families. And we can help you find just the right alien pet, too.
        </h5>
      </div> */}

      <Segment padded="very">
        <div>
          {/* <Header as="h1" size="huge">
          UFO TOFU
        </Header> */}
          {/* <h3>{'Pet Out Of This World'}</h3> */}
          {/* <a target="/products" className="ui large image">
          <img src="homepage1.png" />
        </a> */}
          <Image centered size="medium" src="homepage1.png" />
          {/* <Link as={Image} to="/products" /> */}
          <Segment>
            <Image centered size="massive" src="aboutus2.png" />
          </Segment>
        </div>
      </Segment>
    </div>
  )
}

export default Home
