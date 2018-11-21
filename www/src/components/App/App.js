import React, {Component} from 'react';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import Admin from '../Admin/Admin';
import Board from '../Board/Board';
import { getFiles } from '../../actions';
import './App.css';

class App extends Component {
   constructor(props){
      super(props);
      this.state = { 
         route: window.location.pathname, 
         endpoint: "http://127.0.0.1:7000"
      }
   }

   componentDidMount(){
      this.props.getFiles();
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.on("update", () => this.props.getFiles());
   }

   render() {
      const { files } = this.props;
      
      let Child;
      switch (this.state.route) {
         case '/admin': 
            Child = Admin
            break;
         default:
            Child = Board;
      }

      return (
         <div className="App">
            <Child files={files} />
         </div>
      );
   }
}

const mapStateToProps = ({ files }) => ({ files });

export default connect(mapStateToProps, { getFiles })(App);