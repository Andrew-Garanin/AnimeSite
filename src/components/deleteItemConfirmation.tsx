import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { Grid, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';


export const AlertDialog = ({ deleteButtonDisplay, onClick }: { deleteButtonDisplay: { display: string }, onClick: () => void }) => {
  const [open, setOpen] = React.useState(false);

  const color2 = "#fbc2eb";
  const color1 = "#a6c1ee";
  const color3 = "#e17afe";
  const color4 = "#9baaff";

  const [deleteDialogButtonColor, setDeleteDialogButtonColor] = useState({ background: `linear-gradient(to top,  ${color3} ,${color4})` });
  const [cancelDialogButtonColor, setCancelDialogButtonColor] = useState({ background: `linear-gradient(to top,  ${color3} ,${color4})` });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <IconButton
        aria-label="delete"
        style={deleteButtonDisplay}
        sx={{ color: '#453a94', marginTop: "5px", width: "40px", height: "40px" }}
        onClick={handleClickOpen}>
        <DeleteForeverIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">

        <Grid container
          display='flex'
          direction='column'
          style={{ background: `linear-gradient(to bottom,  ${color1} ,${color2})` }}>

          <DialogTitle id="alert-dialog-title">
            {"Delete this card?"}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you delete this card, you will lose it forever🥺
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleClose}
              style={{ color: 'white', background: cancelDialogButtonColor.background }}
              onMouseEnter={e => {
                setCancelDialogButtonColor({ background: `linear-gradient(to top,  ${color4} ,${color3})` });
              }}
              onMouseLeave={e => {
                setCancelDialogButtonColor({ background: `linear-gradient(to top,  ${color3} ,${color4})` })
              }}
            >Cancel
            </Button>
            <Button
              onClick={onClick}
              autoFocus
              style={{ color: 'white', background: deleteDialogButtonColor.background }}
              onMouseEnter={e => {
                setDeleteDialogButtonColor({ background: `linear-gradient(to top,  ${color4} ,${color3})` });
              }}
              onMouseLeave={e => {
                setDeleteDialogButtonColor({ background: `linear-gradient(to top,  ${color3} ,${color4})` })
              }}>
              Delete
            </Button>
          </DialogActions>

        </Grid>
      </Dialog>
    </Box>
  );
}