import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Dash extends Component {
	constructor(props) {
		super(props);
		this.state = { index: 0 };
	}

	// componentDidMount() {
   //    const { files } = this.props;
   //    const { index } = this.state;

	// 	this.interval = setInterval(() => {
	// 		if (this.state.index < this.props.files.length - 1 ) {
	// 			this.setState((state, props) => ({ index: index + 1 }));
	// 		} else {
	// 			this.setState({ index: 0 });
	// 		}
	// 	}, 1000);
	// }

	// componentWillUpdate(nextProps){
	// 	if(nextProps.files.length !== this.props.files.length){
	// 		console.log("zajebano")
	// 		clearInterval(this.interval);
	// 	}
   // }
   // componentWillUnmount() {
	// 	clearInterval(this.interval);
	// }

   // renderImage(){
   //    const { files } = this.props;
   //    const { index } = this.state;
   //    if (files && files.length > 0) {
   //       return <img style={{height: 500, width: 500}} src={files[index].path} alt="img" />
   //    } else {
   //       return <h4>No image present!</h4>
   //    }
   // }

   render(){
      return (
         <div>
            aj
         </div>
      );
   }
}

const mapStateToProps = ({ files }) => ({ files });

export default connect(mapStateToProps)(Dash);