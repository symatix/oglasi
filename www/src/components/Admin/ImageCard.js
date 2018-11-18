import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { deleteFile } from '../../actions';

const styles = theme => ({
   card: {
      maxWidth: 400,
   },
   media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
   }
});

class ImageCard extends React.Component {

   handleDelete = () => {
      const { _id, deleteFile } = this.props;
      deleteFile(_id)
   };

  render() {
    const { classes, path } = this.props;

    return (
      <Grid item xs={12} sm={4} lg={3}>
         <Card className={classes.card}>
            <CardHeader
               action={
                  <IconButton onClick={this.handleDelete}>
                     <Delete />
                  </IconButton>
               }
            />
            <CardMedia
               className={classes.media}
               image={path}
            />
         </Card>
      </Grid>
    );
  }
}

ImageCard.propTypes = {
  classes: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  fs_path: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
};

export default connect(null, { deleteFile})(withStyles(styles)(ImageCard));
