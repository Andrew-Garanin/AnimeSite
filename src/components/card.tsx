import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { SimpleDialogDemo } from "./dialog";
import { CardActionArea, CardMedia, Chip, Grid } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import LinkIcon from '@mui/icons-material/Link';


export const MyCard = ({ id, image_reference, title, text, src_reference, refe }:
  { id: number, image_reference: string, title: string, text: string, src_reference: string, refe: string }) => {
  const color1 = "#757F9A";
  const color2 = "#D7DDE8";
  const section = {
    height: "100%",
  };

  const new_string = src_reference.substring(8, src_reference.indexOf("/", 8))

  return (
    <Card id={id.toString()} className='card' style={{ background: `linear-gradient(to right,  ${color1} 0%,${color2} 100%)` }} sx={{ boxShadow: 4 }}>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="flex-start">

        <Grid item md={6}>
          <CardContent sx={{ height: '100%' }} style={{ padding: 0 }}>
            <CardActionArea>
              <CardMedia
                className="prev_image"
                component="img"
                height="200"
                image={image_reference}
                alt="Paella dish"
              />
            </CardActionArea>
          </CardContent>
        </Grid>

        <Grid item md={6}>

          <Grid container
            direction="column"
            px={1}
            spacing={2}
            style={section}
          >

            <Grid item >
              <Typography height="5rem" variant="body2" paddingTop="14px" paddingLeft="14px" paddingRight="14px" className="main_card_text">
                {title}
              </Typography>
            </Grid>

            <Grid item display="flex" alignItems="center" paddingLeft="100px">

              <Chip label={new_string}
                icon={<LinkIcon />}
                //sx={{ backgroundColor: 'red' }}
                onClick={() => window.open(src_reference, "_blank")}
              />

            </Grid>

            <Grid item paddingLeft={2}>
              <SimpleDialogDemo
                image_reference={image_reference}
                title={title}
                text={text}
                src_reference={src_reference}
              />

            </Grid>

          </Grid>

        </Grid>
      </Grid>
    </Card>
  );
}

