import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { SimpleDialogDemo } from "./dialog";
import { Box, CardActionArea, CardMedia, Chip, Grid } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from 'react';
import { color } from '@mui/system';

export const MyCard = ({ id, image_reference, title, text, src_reference, refe }:
  { id: number, image_reference: string, title: string, text: string, src_reference: string, refe: string }) => {
  const color2 = "#fbc2eb";
  const color1 = "#a6c1ee";
  const section = {
    height: "100%",
  };
  const [style, setStyle] = useState({ display: 'none' });
  const new_string = src_reference.substring(8, src_reference.indexOf("/", 8))
  return (
    <Card id={id.toString()} className='card' style={{ background: `linear-gradient(to bottom,  ${color1} 0%,${color2} 100%)` }} sx={{ boxShadow: 4 }}
      onMouseEnter={e => {
        setStyle({ display: 'block' });
      }}
      onMouseLeave={e => {
        setStyle({ display: 'none' })
      }}>
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
            spacing={1.7}
            style={section}
          >

            <Grid item display="flex" direction='row' justifyContent='space-between'>
              <Typography height="5rem" variant="body2" paddingTop="14px" paddingLeft="14px" paddingRight="14px" className="main_card_text">
                {title}
              </Typography>
                <Box justifySelf="end">   
                  <DeleteForeverIcon style={style} onClick={() => { console.log("Я мусор!") }} sx={{ paddingTop: 0.5, paddingLeft: 0, color: '#453a94'}}></DeleteForeverIcon>
                </Box>
            </Grid>

            <Grid item display="flex" alignItems="center">

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

