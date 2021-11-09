import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { CardMedia, DialogContent, Grid } from '@mui/material';


export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  image_reference: string;
  title: string;
  text: string;
  src_reference: string;
}

const SimpleDialog = (props: SimpleDialogProps) => {
  const { onClose, open, image_reference, title, text, src_reference } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth
      maxWidth="md">
      <Grid container
        direction="row"

        alignItems="flex-start">

        <Grid item md={6} >
          <DialogContent style={{ height: '600px', padding: 0 }}>
            <CardMedia
              className="prev_image"
              component="img"
              height='100%'
              image={image_reference}
              alt="Paella dish"
            />
  
            <Typography variant="body2" paddingTop="14px" paddingLeft="14px" paddingRight="14px" className="main_card_text">
              {title}
            </Typography>

          </DialogContent>
        </Grid>

      </Grid>
    </Dialog>
  );
}

export const SimpleDialogDemo = ({ image_reference, title, text, src_reference }: { image_reference: string,title: string,text: string,src_reference: string }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button className="info_button" variant="outlined" onClick={handleClickOpen} size='medium' sx={{width: "95%",  color:"#ff88eb", border: '2px solid #ff88eb'}}>
        More
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        image_reference={image_reference}
        title={title}
        text={text}
        src_reference={src_reference}
      />
    </Box>
  );
}