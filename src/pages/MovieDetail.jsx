import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, Button, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useMovieServices from "../services/useMovieServices";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../components/EditModal";

const MovieDetail = ({ open, setOpen }) => {
  const { id } = useParams();
  console.log(id);
  const { getOneMovie, deleteMovie } = useMovieServices();
  const oneMovie = useSelector((state) => state.movie.oneMovie);
  // const categories = useSelector((state) => state.category.categories);
  const { users, username: ownUser } = useSelector((state) => state.login);

  const myUserID = users?.find((user) => user?.username === ownUser)?._id;
  console.log("myUserID", myUserID);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpen = () => {
    console.log("oneMovie => open basi =", oneMovie);
    setInputInfos({
      movieTitle: oneMovie?.movieTitle,
      year: oneMovie?.year,
      image: oneMovie?.image,
      userId: myUserID,
    });
    setOpenEdit(true);
  };
  const handleClose = () => setOpenEdit(false);
  const [inputInfos, setInputInfos] = useState({
    movieTitle: oneMovie?.movieTitle,
    year: oneMovie?.year,
    image: oneMovie?.image,
    userId: myUserID,
  });

  useEffect(() => {
    getOneMovie(id);
  }, [id]);

  useEffect(() => {
    if (oneMovie) {
      setInputInfos({
        movieTitle: oneMovie?.movieTitle,
        year: oneMovie?.year,
        image: oneMovie?.image,
        userId: myUserID,
      });
    }
  }, [oneMovie, myUserID]);

  
  const username = users?.find(
    (user) => user?._id === oneMovie?.user_id
  )?.username;
  // const category = categories?.find(
  //   (cat) => cat?._id === oneMovie?.categoryId
  // )?.name;

  return (
    <Box maxWidth={1200} mx={"auto"} my={15}>
      <Card
        sx={{
          maxWidth: 1200,
          minHeight: 280,
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
            subheader={new Date(oneMovie?.createdAt).toLocaleString("tr-TR")}
            // subheader="September 14, 2016"
          />
          <CardContent>
            <Typography fontWeight={500}>{oneMovie?.movieTitle}</Typography>
            <Typography variant="body2" color="text.secondary">
              {oneMovie?.year}
            </Typography>
          </CardContent>
        </Box>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap:"wrap"
          }}
        >
          {/* <Typography variant="body2" color="text.secondary">
            Category:{category}
          </Typography> */}
          {/* <img src={inputInfos?.image} width="370px" alt="img" /> */}
          <CardMedia
        component="img"
        sx={{ width: "370px" }}
        image={inputInfos?.image}
        alt="img"
      />
          <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            {username === ownUser && (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ display: "flex", alignItems: "center", gap: ".4rem" }}
                  onClick={() => handleOpen()}
                >
                  Edit
                  <BorderColorIcon />
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ display: "flex", alignItems: "center", gap: ".4rem" }}
                  onClick={() => deleteMovie(id)}
                >
                  Delete
                  <DeleteIcon />
                </Button>
              </Box>
            )}
            <Link to={"/"}>
              <Button
                variant="contained"
                sx={{ display: "flex", alignItems: "center", gap: ".4rem" }}
              >
                Home
                <HomeIcon />
              </Button>
            </Link>
          </Box>
        </CardActions>
      </Card>
      <EditModal
        open={openEdit}
        handleOpen={handleOpen}
        handleClose={handleClose}
        {...oneMovie}
        inputInfos={inputInfos}
        setInputInfos={setInputInfos}
      />
    </Box>
  );
};

export default MovieDetail;
