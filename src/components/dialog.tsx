import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { CardMedia, DialogContent, Grid } from '@mui/material';


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

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      open={open}
      maxWidth="md">
      <Grid container
        direction="row">

        <Grid item md={6} >
          <DialogContent style={{ height: '80vh', padding: 0 }}>
            <CardMedia
              className="prev_image"
              component="img"
              height='100%'
              image={image_reference}
              alt="Anime picture" />
          </DialogContent>
        </Grid>

        <Grid item md={6} >
          <Typography variant="body2" paddingTop="14px" paddingLeft="14px" paddingRight="14px" className="main_card_text">
            {title}
          </Typography>
        </Grid>

      </Grid>
    </Dialog>
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