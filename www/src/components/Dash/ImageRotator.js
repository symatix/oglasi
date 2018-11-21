import React from 'react';
import { withRouter } from 'react-router-dom';

class Dash extends React.Component {
	constructor(props) {
		super(props);
		this.state = { index: 0 };
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			if (this.state.index < this.props.files.length - 1) {
				this.setState((state, props) => ({ index: state.index + 1 }));
			} else {
				this.setState({ index: 0 });
			}
		}, 1000);
	}

	componentWillUpdate(nextProps){
		if(nextProps.files.length !== this.props.files.length){
			console.log("zajebano")
			clearInterval(this.interval);
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const { files } = this.props;
		const { index } = this.state;
		return (
			<div>
				
			</div>
		)
	}
}

export default withRouter(Dash);
