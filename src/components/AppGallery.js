import GridList from '@material-ui/core/GridList';
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    gridList: {
      width: '100vw',
      height: `calc(100vh - 64px)`,
      margin: '0px!important'
    },
  }),
);

export const AppGallery = ({children}) => {
  const classes = useStyles();
  return (
    <GridList
      cellHeight={250}
      className={classes.gridList}
      cols={3}>
      {children}
    </GridList>
  )
};
