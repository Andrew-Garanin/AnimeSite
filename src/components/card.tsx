import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { SimpleDialogDemo } from "./dialog";
import { CardMedia, Grid } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
export const MyCard=() => {
  const color1 = "#757F9A";
  const color2 = "#D7DDE8";
  return(
  <Card style={{background: `linear-gradient(to right,  ${color1} 0%,${color2} 100%)`}}>
    <Grid container
      direction="row"
      justifyContent="center"
      alignItems="flex-start" >

      <Grid item md={6}>
        <CardContent>
            <CardMedia 
                className = "prev_image"
                component="img"
                height="200"
                image="https://i.pinimg.com/564x/6d/57/7d/6d577d38bae09e0daa201d52b795aa95.jpg"
                alt="Paella dish"
            />
        </CardContent>
      </Grid>

      <Grid item md={6}>
        <Typography variant="body2" paddingTop="14px">
            凪白みと🖖 on Twitter.
        </Typography>

        <CardActions>
          <SimpleDialogDemo />
        </CardActions>
      </Grid>
    </Grid>
  </Card>
);
}

