// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { Box, Button, CardMedia, Grid } from "@mui/material";
import  Grid  from "@mui/material/Grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Button } from "@mui/material";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function CardComp({
  movieTitle,
  year,
  image,
  _id,
  username,
  createdAt,
}) {
  const [expanded, setExpanded] = useState(false);

  const theme = useTheme();
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <Grid item xs={10} sm={10} md={5} lg={4} xl={3}>
       <Card sx={{ display: 'flex',height:"250px",backgroundColor:"bisque" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6" sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}>
            {movieTitle}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
           {year}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
           by {username}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <Link to={"/" + _id}>
            <Button variant="contained">
              More
              <ChevronRightIcon />
            </Button>
          </Link>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "50%" }}
        image={image}
        alt="img"
      />
    </Card>
      {/* <Card
        sx={{
          maxWidth: 345,
          height: 400,
          padding: ".5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1rem",
          
        }}
      >
        <Box>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {username ? username[0]?.toUpperCase() : "A"}
              </Avatar>
            }
            title={username}
            subheader={new Date(createdAt).toLocaleString("tr-TR")}
            // subheader="September 14, 2016"
          />
          <CardContent sx={{width:"100%",height:"100%", border:"1px solid red"}}>
            <Typography
              fontWeight={500}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {movieTitle}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              // sx={{
              //   overflow: "hidden",
              //   textOverflow: "ellipsis",
              //   display: "-webkit-box",
              //   WebkitLineClamp: "3",
              //   WebkitBoxOrient: "vertical",
              // }}
            >
              Year: {year}
            </Typography>
            <CardMedia component="img" sx={{width:"100%",height:"100%"}} image={image} alt="img" />
          </CardContent>
        </Box>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* <Typography variant="body2" color="text.secondary" >Category:{category}</Typography> 
          <Link to={"/" + _id}>
            <Button variant="contained">
              More
              <ChevronRightIcon />
            </Button>
          </Link>
        </CardActions>
      </Card> */}
    </Grid>
  );
}
