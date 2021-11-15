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
import { useState } from 'react';


export default function FormDialog() {
    const [open, setOpen] = useState(false);

    // For editing
    const [srcReferenceEditingValue, setSrcReferenceEditingValue] = useState('')
    const [titleEditingValue, setTitleEditingValue] = useState('')
    const [textEditingValue, setTextEditingValue] = useState('')
    const [imageReferenceEditingValue, setImageReferenceEditingValue] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
       
        setOpen(false);
    };

    const submitData = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 13,
                image_reference: imageReferenceEditingValue,
                title: titleEditingValue,
                text: textEditingValue,
                src_reference: srcReferenceEditingValue,
                refe: "google.com"
            })
        };

        fetch(`http://localhost:3000/cards/`, requestOptions).then(response => response.json())
            .then(data => {
                handleClose();
            });
    }

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
                                        label="Source link"
                                        fullWidth
                                        variant="standard"
                                        onChange={(value) => { setSrcReferenceEditingValue(value.currentTarget.value) }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container direction='row' alignItems='end'>
                                <Grid item marginX='1vw'>
                                    <PushPinIcon />
                                </Grid>
                                <Grid item width='90%'>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Title"
                                        fullWidth
                                        variant="standard"
                                        onChange={(value) => { setTitleEditingValue(value.currentTarget.value) }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container direction='row' alignItems='end'>
                                <Grid item marginX='1vw'>
                                    <AutoStoriesIcon />
                                </Grid>
                                <Grid item width='90%'>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Description"
                                        fullWidth
                                        variant="standard"
                                        onChange={(value) => { setTextEditingValue(value.currentTarget.value) }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container direction='row' alignItems='end'>
                                <Grid item marginX='1vw'>
                                    <AddAPhotoIcon />
                                </Grid>
                                <Grid item width='90%'>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Image link"
                                        fullWidth
                                        variant="standard"
                                        onChange={(value) => { setImageReferenceEditingValue(value.currentTarget.value) }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={submitData}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}