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
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { api } from './Api';
import { validateTitle, validateURL } from './Validation';


export default function NewCardDialog({ callback }: { callback: () => void }) {
    const color1 = "#a6c1ee";
    const color2 = "#fbc2eb";
    const color3 = "#e17afe";
    const color4 = "#9baaff";
    const color5 = "#d900ff";

    const [submitDialogButtonColor, setSubmitDialogButtonColor] = useState({ background: `linear-gradient(to top,  ${color3} ,${color4})` });
    const [cancelDialogButtonColor, setCancelDialogButtonColor] = useState({ background: `linear-gradient(to top,  ${color3} ,${color4})` });
    const [open, setOpen] = useState(false);

    // For editing
    const [srcReferenceEditingValue, setSrcReferenceEditingValue] = useState('')
    const [titleEditingValue, setTitleEditingValue] = useState('')
    const [textEditingValue, setTextEditingValue] = useState('')
    const [imageReferenceEditingValue, setImageReferenceEditingValue] = useState('')

    // For validation
    const [errorTitleMessage, setErrorTitleMessage] = useState("");
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorImageMessage, setErrorImageMessage] = useState("");
    const [errorImage, setErrorImage] = useState(false);

    async function newID() {
        return await api.getLastID() + 1;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        callback();
        setSrcReferenceEditingValue('');
        setTitleEditingValue('');
        setTextEditingValue('');
        setImageReferenceEditingValue('');

        setErrorTitle(false);
        setErrorTitleMessage("");
        setErrorImage(false);
        setErrorImageMessage("");

        setOpen(false);
    };

    async function submitData() {
        var error = false;
        if (!validateTitle(titleEditingValue)) {
            setErrorTitle(true);
            setErrorTitleMessage("title is empty");
            error = true;
        }
        else{
            setErrorTitle(false);
            setErrorTitleMessage("");
        }
        console.log(validateURL(imageReferenceEditingValue))
        if (!validateURL(imageReferenceEditingValue)) {
            setErrorImage(true);
            setErrorImageMessage("image link is wrong");
            error = true;
        }
        else{
            setErrorImage(false);
            setErrorImageMessage("");
        }
        if (!error) {
            await api.addItem(await newID(), imageReferenceEditingValue, titleEditingValue, textEditingValue, srcReferenceEditingValue);
            handleClose();
        }

    };

    return (
        <Box>
            <Button sx={{ marginX: '1vw', color: 'white' }}
                variant="contained"
                onClick={handleClickOpen}
                color='primary'>
                New Card
            </Button>

            <Dialog fullWidth
                open={open}
                onClose={handleClose}>

                <Grid container
                    display='flex'
                    direction='column'
                    style={{ background: `linear-gradient(to bottom,  ${color1} ,${color2})` }}>
                    <DialogTitle color={color5}>Enter new card's data</DialogTitle>
                    <DialogContent>
                        <Grid container direction='column'>

                            <Grid item>
                                <Grid container
                                    direction='row'
                                    alignItems='end'>
                                    <Grid item
                                        marginX='1vw'
                                        color={color5}>
                                        <LinkIcon />
                                    </Grid>

                                    <Grid item width='90%'>
                                        <TextField
                                            color="secondary"
                                            margin="dense"
                                            label="Source link"
                                            fullWidth
                                            variant="standard"
                                            onChange={(value) => { setSrcReferenceEditingValue(value.currentTarget.value) }} />
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item>
                                <Grid container
                                    direction='row'
                                    alignItems='end'>

                                    <Grid item
                                        marginX='1vw'
                                        color={color5}>
                                        <PushPinIcon />
                                    </Grid>

                                    <Grid item width='90%'>
                                        <TextField
                                            error={errorTitle}
                                            helperText={errorTitleMessage}
                                            color="secondary"
                                            margin="dense"
                                            label="Title"
                                            fullWidth
                                            variant="standard"
                                            onChange={(value) => { setTitleEditingValue(value.currentTarget.value) }} />
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item>
                                <Grid container
                                    direction='row'
                                    alignItems='end'>

                                    <Grid item
                                        marginX='1vw'
                                        color={color5}>
                                        <AutoStoriesIcon />
                                    </Grid>

                                    <Grid item width='90%'>
                                        <TextField
                                            color="secondary"
                                            margin="dense"
                                            label="Description"
                                            fullWidth
                                            variant="standard"
                                            onChange={(value) => { setTextEditingValue(value.currentTarget.value) }} />
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item>
                                <Grid container
                                    direction='row'
                                    alignItems='end'>

                                    <Grid item
                                        marginX='1vw'
                                        color={color5}>
                                        <AddAPhotoIcon />
                                    </Grid>

                                    <Grid item width='90%'>
                                        <TextField
                                            error={errorImage}
                                            helperText={errorImageMessage}
                                            color="secondary"
                                            margin="dense"
                                            label="Image link"
                                            fullWidth
                                            variant="standard"
                                            onChange={(value) => { setImageReferenceEditingValue(value.currentTarget.value) }} />
                                    </Grid>

                                </Grid>
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}
                            style={{ color: 'white', background: cancelDialogButtonColor.background }}
                            onMouseEnter={e => {
                                setCancelDialogButtonColor({ background: `linear-gradient(to top,  ${color4} ,${color3})` });
                            }}
                            onMouseLeave={e => {
                                setCancelDialogButtonColor({ background: `linear-gradient(to top,  ${color3} ,${color4})` })
                            }}>
                            Cancel
                        </Button>

                        <Button onClick={submitData}
                            style={{ color: 'white', background: submitDialogButtonColor.background }}
                            onMouseEnter={e => {
                                setSubmitDialogButtonColor({ background: `linear-gradient(to top,  ${color4} ,${color3})` });
                            }}
                            onMouseLeave={e => {
                                setSubmitDialogButtonColor({ background: `linear-gradient(to top,  ${color3} ,${color4})` })
                            }}>
                            Submit
                        </Button>

                    </DialogActions>
                </Grid>
            </Dialog>
        </Box>
    );
}