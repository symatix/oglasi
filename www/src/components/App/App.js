import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import Dash from '../Dash/Dash';
import Admin from '../Admin/Admin';
import { getFiles } from '../../actions';
import './App.css';

class App extends Component {
   componentDidMount(){
      this.props.getFiles();
   }

   render() {
      return (
         <div className="App">
            <BrowserRouter>
               <div>
                  <Route path="/" exact component={Dash} />
                  <Route path="/admin" exact component={Admin} />
               </div>
            </BrowserRouter>
         </div>
      );
   }
}

export default connect(null, { getFiles })(App);
