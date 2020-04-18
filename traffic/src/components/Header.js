import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';
class Header extends React.Component{
    constructor(props){
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen:false
        }
      }
      toggle(){
        this.setState ({ 
          isOpen: !this.state.isOpen
        });
      }
render(){
    return(
        <div>
            <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{this.props.appName}</NavbarBrand>
        <NavbarToggler onClick={this.toggle.bind(this)} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              100 traffic incidents
            </NavItem>
            
          </Nav>
        </Collapse>
      </Navbar> 
        </div>
    );
}
}
export default Header;