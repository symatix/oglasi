import React from 'react';
import { connect } from 'react-redux';

class Dash extends React.Component {
   constructor(props) {
     super(props);
     this.state = {index: 0};
   }
   
   componentDidMount() {
     this.interval = setInterval(() => {
       if (this.props.files.length > 0 && this.state.index < this.props.files.length - 1) {
         this.setState((state, props) => ({index: state.index + 1}));        
       } else if (this.props.files.length > 0 && this.state.index === this.props.files.length) {
         this.setState({index: 0});
       }
     }, 300);
   }
   
   componentWillUnmount() {
     clearInterval(this.interval);
   }
   
   renderImg(){
      if (this.props.files.length > 0){
         console.log(this.state.index)
         return <img src={this.props.files[this.state.index].path} alt="img" />
      }
      return 'No image present!'
   }

   render() {
     return (
       <div>
         {this.renderImg()}
       </div>
     )
   }
 }

function mapStateToProps({ files }){
   return { files }
}
export default connect(mapStateToProps)(Dash);
