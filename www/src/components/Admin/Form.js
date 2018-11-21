import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
   button: {
      margin: theme.spacing.unit,
   },
   input: {
      display: 'none',
   },
});


class Form extends Component {
   constructor(props) {
      super(props);
      this.handleFile = this.handleFile.bind(this);
   }

   handleFile(e) {
      const file = new FormData();
      file.set('file', e.target.files[0])
      axios.post('/api/file', file, {
         headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'type': "formData"
         }
      });
   }

   handleTime(e){
      console.log(e.target.value)
   }

   render() {
      const { classes } = this.props;
      return (
         <div>
            <input
               accept="image/*"
               className={classes.input}
               id="contained-button-file"
               type="file"
               name="file"
               onChange={this.handleFile}
            />
            <label htmlFor="contained-button-file">
               <Button
                  variant="contained"
                  component="span"
                  className={classes.button}>
                  Upload
               </Button>
            </label>
         </div>
      );
   }
}

Form.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);


