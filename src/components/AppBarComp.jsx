 
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"; 
import useAuthServices from "../services/useAuthServices";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function AppBarComp() {
  const { logout } = useAuthServices();
  const { username } = useSelector((state) => state.login);
  // const [usernameCookie,setUsername] = useCookies('username');

  // console.log(usernameCookie);
  return (
    <Box sx={{ flexGrow: 1, mb: 2,   }} >
      <Box  mx={"auto"}>
        <AppBar position="static" color="transparent" px={15}>
          <Toolbar sx={{display:"flex",alignItems:'center',justifyContent:"space-between"}}>
            <Link to={username ? "/" : "/login"}> <Typography variant="h6" component="div" sx={{ flexGrow: 1,color:'lightgreen' }}>
              Movies
            </Typography></Link>
            {username ? (
              <Box>
                <Link to="/user"><Button variant="outlined" sx={{ color: "lightgreen" }}>
                  {username}
                  {/* {usernameCookie} */}
                  {/* "degisecek" */}
                </Button></Link>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Box >
                <Link to="/login">
                <Button variant="outlined" sx={{ color: "lightgreen" }}>
                  Login
                </Button></Link>
                <Link to="/register"><Button color="inherit" >
                  Register
                </Button></Link>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
