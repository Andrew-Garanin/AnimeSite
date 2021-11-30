import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { CardMedia, DialogContent, Grid, InputAdornment, TextField, useMediaQuery } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DownloadIcon from '@mui/icons-material/Download';
import PushPinIcon from '@mui/icons-material/PushPin';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import TwitterIcon from '@mui/icons-material/Twitter';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DoneIcon from '@mui/icons-material/Done';
import { useState, useRef } from 'react';
import { api } from './Api';
import { saveAs } from 'file-saver'
import CloseIcon from '@mui/icons-material/Close';
import { validateTitle, validateURL } from './Validation';
import { theme } from './Themes';


export interface MoreDialogProps {
  open: boolean;
  image_reference: string;
  title: string;
  text: string;
  src_reference: string;
  onClose: () => void;
  id: number;
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
  const isHD = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const { image_reference, title, text, src_reference, id, getCards } = props;
  const [open, setOpen] = React.useState(false);

  const [mode, setMode] = useState("view")
  const color5 = "#d900ff";
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

  // For validation
  const [errorTitleMessage, setErrorTitleMessage] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorImageMessage, setErrorImageMessage] = useState("");
  const [errorImage, setErrorImage] = useState(false);

  async function handleUpdateItem(id: number) {
    var error = false;
    if (!validateTitle(titleEditingValue)) {
      setErrorTitle(true);
      setErrorTitleMessage("title is empty");
      error = true;
    }
    else {
      setErrorTitle(false);
      setErrorTitleMessage("");
    }
    console.log(validateURL(imageReferenceEditingValue))
    if (!validateURL(imageReferenceEditingValue)) {
      setErrorImage(true);
      setErrorImageMessage("image link is wrong");
      error = true;
    }
    else {
      setErrorImage(false);
      setErrorImageMessage("");
    }
    if (!error) {
      const data = await api.updateItem(id, srcReferenceEditingValue, titleEditingValue, textEditingValue, imageReferenceEditingValue)
      setSrcReferenceCurrentValue(data.src_reference);
      setTitleCurrentValue(data.title);
      setTextCurrentValue(data.text);
      setImageReferenceCurrentValue(data.image_reference);
      setMode("view")
    }
  }

  const editButton = () => {
    setMode("edit")
  }

  const canselEditModeButton = () => {
    setMode('view')
    setErrorTitle(false);
    setErrorTitleMessage("");
    setErrorImage(false);
    setErrorImageMessage("");
  }

  const saveButton = () => {
    handleUpdateItem(id)
  }

  const shortReference = srcReferenceCurrentValue.substring(8, srcReferenceCurrentValue.indexOf("/", 8))


  const download = () => {
    // Func for download image.
    saveAs(imageReferenceCurrentValue, "image.jpg");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    getCards();
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

      <Dialog
        fullWidth
        onClose={handleClose}
        open={open}
        maxWidth="md">

        <Grid container
          className="dialog"
          direction={isHD ? "row" : "column"}
          flexWrap="nowrap">

          <Grid item md={6} xs={8}>
            <DialogContent style={{ height: '80vh', padding: 0 }}>
              <CardMedia
                className="prev_image"
                component="img"
                height='100%'
                image={imageReferenceCurrentValue}
                alt="Anime picture" />
            </DialogContent>
          </Grid>

          <Grid item md={6} xs={8}>
            <DialogContent style={{ height: '80vh', padding: 0 }}>
              <Box overflow='auto' height="100%" className='section'>
                <Grid container
                  direction='column'

                  spacing={3}
                  height="100%"
                  padding={isHD ? '1vw' : '2.5vw'}
                  wrap="nowrap">

                  <Grid item display={isHD ? 'false' : 'flex'} justifyContent={isHD ? 'false' : 'space-between'}>
                    <Button
                      style={{ marginRight: 15 }}
                      sx={{ color: 'white' }}
                      variant="contained"
                      onClick={() => { download() }}>
                      <DownloadIcon /> Save image...
                    </Button>

                    {mode === 'view' && <Button
                      sx={{ color: 'white' }}
                      onClick={editButton}
                      variant="contained">
                      <ModeEditOutlineIcon /> Edit mode
                    </Button>}
                  </Grid>

                  <Grid item>
                    <Grid container direction='column'>

                      <Grid item color={color5}>
                        <LinkIcon />
                      </Grid>

                      <Grid item>
                        <a href={srcReferenceCurrentValue}>{shortReference}</a>
                        {mode === 'edit' && <TextField ref={srcReferenceContentRef} label="Source link" multiline rows={3} InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ModeEditOutlineIcon />
                            </InputAdornment>
                          ),
                        }} size='small' sx={{ width: '100%', marginTop: '2vh' }} type='text' defaultValue={srcReferenceCurrentValue} onChange={(value) => { setSrcReferenceEditingValue(value.currentTarget.value) }}></TextField>}
                      </Grid>

                      <Grid item>
                        <Grid container
                          direction="row"
                          justifyContent='end'
                          paddingY="2vh"
                          alignContent='center'>

                          <Grid item color='#0052D4'>
                            <FacebookIcon sx={{ fontSize: '32px', cursor: 'pointer' }} onClick={() => window.open(`http://www.facebook.com/sharer.php? u=${srcReferenceCurrentValue}`, "_blank")} />
                          </Grid>

                          <Grid item >
                            <WhatsAppIcon sx={{ backgroundColor: '#0f9b0f', color: 'white', cursor: 'pointer', borderRadius: '4px', marginTop: '4px', marginRight: '4px' }} onClick={() => window.open(`https://web.whatsapp.com/send?text=${srcReferenceCurrentValue}`, "_blank")} />
                          </Grid>

                          <Grid item>
                            <TelegramIcon sx={{ backgroundColor: '#2193b0', color: 'white', cursor: 'pointer', borderRadius: '4px', marginTop: '4px', marginRight: '4px' }} onClick={() => window.open(`https://t.me/share/url?url=${srcReferenceCurrentValue}`, "_blank")} />
                          </Grid>

                          <Grid item >
                            <TwitterIcon sx={{ backgroundColor: 'white', color: '#2193b0', cursor: 'pointer', borderRadius: '4px', marginTop: '4px' }} onClick={() => window.open(`https://twitter.com/intent/tweet?url=${srcReferenceCurrentValue}`, "_blank")} />
                          </Grid>

                        </Grid>
                      </Grid>

                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container
                      direction='column'>

                      <Grid item color={color5}>
                        <PushPinIcon />
                      </Grid>

                      <Grid item>
                        <Typography variant="body2">
                          {titleCurrentValue}
                        </Typography>
                        {mode === 'edit' && <TextField error={errorTitle}
                          helperText={errorTitleMessage} ref={titleContentRef} label="Title" multiline rows={3} InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <ModeEditOutlineIcon />
                              </InputAdornment>
                            ),
                          }} size='small' sx={{ width: '100%', marginTop: '2vh' }} type='text' defaultValue={titleCurrentValue} onChange={(value) => { setTitleEditingValue(value.currentTarget.value) }}></TextField>}
                      </Grid>

                    </Grid>
                  </Grid>

                  <Grid item color={color5}>
                    <AutoStoriesIcon />
                  </Grid>

                  <Grid item>
                    <Typography >
                      {textCurrentValue}
                    </Typography>
                    {mode === 'edit' && <TextField ref={textContentRef} label="Description" multiline rows={3} InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ModeEditOutlineIcon />
                        </InputAdornment>
                      ),
                    }} size='small' sx={{ width: '100%', marginTop: '2vh' }} type='text' defaultValue={textCurrentValue} onChange={(value) => { setTextEditingValue(value.currentTarget.value) }}></TextField>}
                  </Grid>

                  <Grid item color={color5}>
                    {mode === 'edit' && <AddAPhotoIcon />}
                    {mode === 'edit' && <TextField error={errorImage}
                      helperText={errorImageMessage} ref={imageReferenceContentRef} label="Image link" multiline rows={3} InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ModeEditOutlineIcon />
                          </InputAdornment>
                        ),
                      }} size='small' sx={{ width: '100%', marginTop: '2vh' }} type='text' defaultValue={imageReferenceCurrentValue} onChange={(value) => { setImageReferenceEditingValue(value.currentTarget.value) }}></TextField>}
                  </Grid>

                  {mode === 'edit' && <Grid item>
                    <Grid container
                      direction='row'
                      spacing={2}>

                      <Grid item>
                        <Button
                          style={{ marginBottom: 10 }}
                          color='success'
                          onClick={saveButton}
                          variant="contained"><DoneIcon />Save</Button>
                      </Grid>

                      <Grid item>
                        <Button
                          style={{ marginBottom: 10 }}
                          color='secondary'
                          onClick={canselEditModeButton}
                          variant="contained"><CloseIcon />Cansel</Button>
                      </Grid>

                    </Grid>
                  </Grid>}
                </Grid>
              </Box>
            </DialogContent>
          </Grid>
        </Grid >
      </Dialog >
    </Box>
  );
}