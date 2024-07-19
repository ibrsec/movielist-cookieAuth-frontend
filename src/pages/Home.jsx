import { useEffect, useState } from "react";
import useMovieServices from "../services/useMovieServices";
import { useSelector } from "react-redux";
import CardComp from "../components/CardComp";
import { Box, Button, Grid } from "@mui/material";
import useAuthServices from "../services/useAuthServices";
// import useCategoryServices from "../services/useCategoryServices";
import ModalComp from "../components/ModalComp";

const Home = () => {
  const { getMovies } = useMovieServices();
  const { getUsers } = useAuthServices();
  // const { getCategories } = useCategoryServices();
  const movies = useSelector((state) => state.movie.movies);
  // const categories = useSelector((state) => state.category.categories);
  const users = useSelector((state) => state.login.users);
  const username = useSelector((state) => state.login.users);
  // const token = useSelector((state) => state.login.token);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getMovies();
    getUsers();
    // getCategories();
    // eslint-disable-next-line
  }, []);
  console.log("movies=", movies);
  // console.log("categories=", categories);
  console.log("users=", users);

  return (
    <>
      <Box align="center" mt={5}>
        {username && (
          <Button variant="contained" onClick={() => setOpen(!open)}>
            New Movie
          </Button>
        )}
      </Box>
      <ModalComp open={open} setOpen={setOpen} />

      <Grid
        container
        spacing={4}
        justifyContent={"center"}
        maxWidth={1200}
        mx={"auto"}
        my={15}
      >
        {movies?.map((item) => (
          <CardComp
            key={item?._id}
            {...item}
            username={
              users?.find((user) => user?._id === item?.user_id)?.username
            }
            // category={
            //   categories?.find((cat) => cat?._id === item?.categoryId)?.name
            // }
          />
        ))}
      </Grid>
    </>
  );
};

export default Home;
