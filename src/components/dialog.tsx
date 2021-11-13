import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { CardMedia, DialogContent, Grid, InputAdornment, TextField } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DownloadIcon from '@mui/icons-material/Download';
import PushPinIcon from '@mui/icons-material/PushPin';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DoneIcon from '@mui/icons-material/Done';
import { useState, useRef } from 'react';

export interface MoreDialogProps {
  open: boolean;
  image_reference: string;
  title: string;
  text: string;
  src_reference: string;
  onClose: () => void;
  id: number;
}

const MoreDialog = (props: MoreDialogProps) => {
  const { open, image_reference, title, text, src_reference, onClose, id } = props;
  const [mode, setMode] = useState("view")

  // Refs
  const srcReferenceContentRef = useRef<HTMLInputElement>(null)
  const titleContentRef = useRef<HTMLInputElement>(null)
  const textContentRef = useRef<HTMLInputElement>(null)
  const imageReferenceContentRef = useRef<HTMLInputElement>(null)

  // For editing
  const [srcReferenceEditingValue, setSrcReferenceEditingValue] = useState(src_reference)
  const [titleEditingValue, setTitleEditingValue] = useState(title)
  const [textEditingValue, setTextEditingValue] = useState(text)
  const [imageReferenceEditingValue, setImageReferenceEditingValue] = useState(image_reference)

  // For current values
  const [srcReferenceCurrentValue, setSrcReferenceCurrentValue] = useState(src_reference)
  const [titleCurrentValue, setTitleCurrentValue] = useState(title)
  const [textCurrentValue, setTextCurrentValue] = useState(text)
  const [imageReferenceCurrentValue, setImageReferenceCurrentValue] = useState(image_reference)

  const handleUpdateItem = (id: number) => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        src_reference: srcReferenceEditingValue,
        title: titleEditingValue,
        text: textEditingValue
      })
    };

    fetch(`http://localhost:3000/cards/${id}`, requestOptions).then(response => response.json())
      .then(data => {
        setSrcReferenceCurrentValue(data.src_reference);
        setTitleCurrentValue(data.title);
        setTextCurrentValue(data.text);
        //setImageReferenceCurrentValue(data.image_reference);
      });
  }

  const editButton = () => {
    if (mode === 'view')
      setMode("edit")
    else
      setMode('view')
  }

  const saveButton = () => {
    handleUpdateItem(id)
  }

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      maxWidth="md">

      <Grid container
        className="dialog"
        direction="row"
        flexWrap="nowrap">

        <Grid item md={6} xs={8}>
          <DialogContent style={{ height: '80vh', padding: 0 }}>
            <CardMedia
              className="prev_image"
              component="img"
              height='100%'
              image={image_reference}
              alt="Anime picture" />
          </DialogContent>
        </Grid>

        <Grid item md={6} xs={8}>
          <DialogContent style={{ height: '80vh', padding: 0 }}>
            <Box overflow='auto' height="100%" className='section'>
              <Grid container
                direction='column'
                px={1}
                spacing={3}
                height="100%"
                padding='1vw'
                wrap="nowrap">

                <Grid item>
                  <Button variant="contained"><DownloadIcon /> Save image...</Button>
                  <Button onClick={editButton} variant="contained"><ModeEditOutlineIcon /> Edit mode...</Button>
                </Grid>

                <Grid item>
                  <Grid container direction='column'>

                    <Grid item>
                      <LinkIcon />
                    </Grid>

                    <Grid item>
                      <a href={srcReferenceCurrentValue}>{srcReferenceCurrentValue}</a>

                      {mode === 'edit' && <TextField ref={srcReferenceContentRef} label="Helper text" multiline rows={3} InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ModeEditOutlineIcon />
                          </InputAdornment>
                        ),
                      }} size='small' sx={{ width: '100%', marginTop: '2vh' }} type='text' defaultValue={srcReferenceCurrentValue} onChange={(value) => { setSrcReferenceEditingValue(value.currentTarget.value) }}></TextField>}
                    </Grid>

                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container
                    direction='column'>

                    <Grid item>
                      <PushPinIcon />
                    </Grid>

                    <Grid item>
                      <Typography variant="body2" paddingTop="14px" paddingLeft="14px" paddingRight="14px" className="main_card_text">
                        {titleCurrentValue}
                      </Typography>
                      {mode === 'edit' && <TextField ref={titleContentRef} label="Helper text" multiline rows={3} InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ModeEditOutlineIcon />
                          </InputAdornment>
                        ),
                      }} size='small' sx={{ width: '100%', marginTop: '2vh' }} type='text' defaultValue={titleCurrentValue} onChange={(value) => { setTitleEditingValue(value.currentTarget.value) }}></TextField>}
                    </Grid>

                  </Grid>
                </Grid>

                <Grid item>
                  <AutoStoriesIcon />
                  <Typography>
                    {textCurrentValue}
                  </Typography>
                  {mode === 'edit' && <TextField ref={textContentRef} label="Helper text" multiline rows={3} InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ModeEditOutlineIcon />
                      </InputAdornment>
                    ),
                  }} size='small' sx={{ width: '100%', marginTop: '2vh' }} type='text' defaultValue={textCurrentValue} onChange={(value) => { setTextEditingValue(value.currentTarget.value) }}></TextField>}
                </Grid>

                <Grid item>

                </Grid>

                {mode === 'edit' && <Grid item>
                  <Button color='success' onClick={saveButton} variant="contained"><DoneIcon />Save</Button>
                </Grid>}

                <Grid item
                  direction="row">

                  <FacebookIcon />
                  <WhatsAppIcon />
                  <TelegramIcon />
                  <PinterestIcon />

                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Grid>
      </Grid >
    </Dialog >
  );
}

export interface SimpleDialogDemoProps {
  image_reference: string;
  title: string;
  text: string;
  src_reference: string;
  id: number;
  getCards: () => void;
}

export const MoreButtonDialog = (props: SimpleDialogDemoProps) => {
  const { image_reference, title, text, src_reference, id, getCards } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    getCards()
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        className="info_button"
        variant="outlined"
        size='medium'
        sx={{ width: "95%", color: "#d57eeb", border: '2px solid #d57eeb' }}
        onClick={handleClickOpen}>
        More
      </Button>

      <MoreDialog
        open={open}
        onClose={handleClose}
        id={id}
        image_reference={image_reference}
        title={title}
        text={text}
        src_reference={src_reference} />
    </Box>
  );
}