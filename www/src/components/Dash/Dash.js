import React from 'react';
import { connect } from 'react-redux';

const Dash = props => {
   return (
      <div>
         <p>Hello world!</p>
      </div>
   );
}

function mapStateToProps({ files }){
   return { files }
}
export default connect(null, mapStateToProps)(Dash);
