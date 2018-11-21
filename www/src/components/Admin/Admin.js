import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Form from './Form';
import ImageCard from './ImageCard';

const styles = theme => ({
   root: {
     flexGrow: 1,
   }
 });

const Admin = props => {
   const renderImages = () => {
      if(props.files){
         return props.files.map(f => <ImageCard key={f._id} {...f}/>)
      }
      return null;
   }

   return (
      <div>
         <Form />
         <Grid container className={props.classes.root} spacing={8}>
            {renderImages()}
         </Grid>
      </div>
   );
}

Admin.propTypes = {
   classes: PropTypes.object.isRequired,
 };
 
export default withStyles(styles)(Admin);
