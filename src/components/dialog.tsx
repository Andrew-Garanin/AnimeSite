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
import AccountCircle from '@mui/icons-material/AccountCircle';
export interface MoreDialogProps {
  open: boolean;
  onClose: () => void;
  image_reference: string;
  title: string;
  text: string;
  src_reference: string;
}

const MoreDialog = (props: MoreDialogProps) => {
  const { open, image_reference, title, text, src_reference, onClose } = props;
  const [mode, setMode] = React.useState("view")

  const handleClose = () => {
    onClose();
  };

  const editButton = () => {
    if (mode == 'view')
      setMode("edit")
    else
      setMode('view')
  }

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      open={open}
      maxWidth="md">

      <Grid
        className="dialog"
        container
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
              wrap="nowrap"
              >
            
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
                    <a href={src_reference}>{src_reference}</a>
                    {mode == 'edit' && <TextField multiline rows={3} InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ModeEditOutlineIcon />
                        </InputAdornment>
                      ),
                    }} size='small' sx={{ width: '100%' }} type='text'></TextField>}
                  </Grid>

                </Grid>
              </Grid>

              <Grid item>
                <Grid container direction='column'>

                  <Grid item>
                    <PushPinIcon />
                  </Grid>

                  <Grid item>
                    <Typography variant="body2" paddingTop="14px" paddingLeft="14px" paddingRight="14px" className="main_card_text">
                      {title}
                    </Typography>
                    {mode == 'edit' && <TextField multiline rows={3} InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ModeEditOutlineIcon />
                        </InputAdornment>
                      ),
                    }} size='small' sx={{ width: '100%' }} type='text'></TextField>}
                  </Grid>

                </Grid>
              </Grid>

              <Grid item>
                <AutoStoriesIcon />
                <Typography>
                  {text}
                </Typography>
                {mode == 'edit' && <TextField multiline rows={3} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ModeEditOutlineIcon />
                    </InputAdornment>
                  ),
                }} size='small' sx={{ width: '100%' }} type='text'></TextField>}
              </Grid>

              <Grid item direction="row">
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
}

export const MoreButtonDialog = (props: SimpleDialogDemoProps) => {
  const { image_reference, title, text, src_reference } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
        image_reference={image_reference}
        title={title}
        text={text}
        src_reference={src_reference} />
    </Box>
  );
}