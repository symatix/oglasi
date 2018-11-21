import React from 'react';

const root = {
   display: 'block',
   margin: '0 auto',
   height: '100%',
   width: '100%'
}

const img = {
	height: '100vh',
	width: 'auto'
}

class Board extends React.Component {
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
		}, 180000);
   }
   
	componentWillUnmount() {
		clearInterval(this.interval);
	}

   renderImg(){
      if (this.props.files.length > 0){
         const { files } = this.props;
         const { index } = this.state;
         return <img style={img} src={files[index].path} alt="bulletin board" />
      }
      return 'No image present';
   }

	render() {
		return (
			<div style={root}>
            {this.renderImg()}
			</div>
		)
	}
}

export default Board;