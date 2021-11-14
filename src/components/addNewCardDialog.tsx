import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PushPinIcon from '@mui/icons-material/PushPin';
import LinkIcon from '@mui/icons-material/Link';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Grid } from '@mui/material';
export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button sx={{ margin: '1vw' }} variant="contained" onClick={handleClickOpen}>
                New Card
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Enter new card's data</DialogTitle>
                <DialogContent>
                    <Grid container direction='column'>
                        <Grid item>
                            <Grid container direction='row' alignItems='end'>
                                <Grid item marginX='1vw'>
                                    <LinkIcon />
                                </Grid>
                                <Grid item width='90%'>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}