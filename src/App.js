import React, { useEffect, useState } from 'react';
import Unsplash from 'unsplash-js';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import GridListTile from '@material-ui/core/GridListTile';
import DialogContentText from '@material-ui/core/DialogContentText';

import './App.css';

import { AppHeader } from './components/AppHeader';
import { AppDrawer } from './components/AppDrawer';
import { AppGallery } from './components/AppGallery';
import { AppDialog } from './components/AppDialog';

import { convertSelectedImgObj } from './utilities/util';

const unsplash = new Unsplash({accessKey: '5fbJEJMCsbZS_Mu4TEgdd5vFf0vr56KeKOjonKLplc0'});

function App() {
  const photoCategories = ['Stars', 'People', 'Mountains', 'Lakes', 'Animals', 'Trees'];

  const [imageSearchResults, updateImageSearchResults] = useState([]);
  const [openDrawer, setDrawerState] = useState(false);
  const [headerText, setHeaderText] = useState('Photo Search');
  const [isDialogOpen, setDialogState] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  const requestImages = (queryString) =>
    unsplash.search.photos(queryString, 1, 15)
      .then(res => res.json())
      .then((res) => {
        updateImageSearchResults(res.results.map(convertSelectedImgObj))
      });

  const inputImageSearch = (e) => e.key === 'Enter'
    ? requestImages(e.target.value)
    : null;

  useEffect(() => {
    requestImages('dogs');
  }, [])


  return (
    <div className="App">
      <AppDrawer
        isOpen={openDrawer}
        onChevronClick={() => setDrawerState(false)}
      >
        <List>
          {photoCategories.map((text, index) => (
            <ListItem
              onClick={() => {
                requestImages(text);
                setHeaderText(text);
                setDrawerState(false);
              }}
              button
              key={text}>
              <ListItemText primary={text}/>
            </ListItem>
          ))}
        </List>
      </AppDrawer>
      <AppHeader
        headerText={headerText}
        shrinkAppHeader={openDrawer}
        onMenuClick={() => setDrawerState(!openDrawer)}
        onSearchKeyUp={(e) => {
          inputImageSearch(e);
          setHeaderText(e.target.value);
        }}
      />
      <AppGallery>
        {imageSearchResults.map((imgObj) => (
          <GridListTile
            className="grid-list-tile"
            onClick={() => {
              setSelectedImage(imgObj);
              setDialogState(true);
            }}
            key={imgObj.id}
            cols={1}>
            <img
              src={imgObj.regularImgLink}
              alt={imgObj.altDescription}/>
          </GridListTile>
        ))}
      </AppGallery>
      <AppDialog
        title={selectedImage.description || 'Untitled'}
        isOpen={isDialogOpen}
        onClose={() => {
          setDialogState(false);
        }}
      >
        <DialogContentText id="alert-dialog-description">
          <span className="dialog-item-row">
            <span>Primary Image Colour: </span>
            <span style={{backgroundColor: selectedImage.color}} className="color-block"/>
          </span>
          <span className="dialog-item-row">
            <span>Creation Date: </span>
            <span> {(new Date(selectedImage.createdAt)).toLocaleDateString()} </span>
          </span>
          <span className="dialog-item-row">
            <span>Download Link: </span>
            <a
              href={selectedImage.downloadLink}
              rel="noreferrer"
              target="_blank"
              download
            >
              Click Here
            </a>
          </span>
        </DialogContentText>
      </AppDialog>
    </div>
  );
}

export default App;
