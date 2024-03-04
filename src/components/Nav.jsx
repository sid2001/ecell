import { Link as LinkScroll, animateScroll as scroll } from "react-scroll";
import {Link} from "react-router-dom";
import '/src/styles/Report.css';
const Nav = ()=>{

  return(
    <div className="nav-bar">
      <ul>
      <li key='Demo'>
        <Link to='/scanPlant'>Demo</Link>
      </li>
      <li key='Pricing'>
        <LinkScroll  activeClass="active" spy={true}  to='pricing' smooth={true} duration={500}>Pricing</LinkScroll>
      </li>
      <li key='about-us'>
        <LinkScroll activeClass="active" spy={true} to='about-us'  smooth={true} duration={500}>About us</LinkScroll>
      </li>
      <li key='Contact Us'>
        <LinkScroll activeClass="active" spy={true} to='contact-us' smooth={true} duration={500}>Contact Us</LinkScroll>
      </li>
     </ul> 
    </div>
  )
}

export default Nav;