import Hidden from "@mui/material/Hidden";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { setContactsSearchText, openNewContactDialog } from "./store/contactsSlice";


function ContactsHeader(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(
    ({ contactsApp }) => contactsApp.contacts.searchText
  );
  const mainTheme = useSelector(selectMainTheme);

  return (
    <div className="flex flex-1 items-center justify-between p-4 sm:p-24">
      <div className="flex flex-shrink items-center sm:w-224">
        <Hidden lgUp>
          <IconButton
            onClick={(ev) => {
              props.pageLayout.current.toggleLeftSidebar();
            }}
            aria-label="open left sidebar"
            size="large"
          >
            <Icon>menu</Icon>
          </IconButton>
        </Hidden>

        <div className="flex items-center">
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
          >
            Vehicles List
          </Typography>

        </div>
      </div>
      <div className="p-24">
          <Button
            variant="contained"
            color="secondary"
            className="w-full"
            onClick={(ev) => dispatch(openNewContactDialog())}
          >
            Add a new vehicle
          </Button>
        </div>

      <div className="flex flex-1 items-center justify-center px-8 sm:px-12">
        <ThemeProvider theme={mainTheme}>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex p-4 items-center w-full max-w-512 h-48 px-16 py-4 shadow"
          >
            <Icon color="action">search</Icon>

            <Input
              placeholder="Search for anything"
              className="flex flex-1 px-16"
              disableUnderline
              fullWidth
              value={searchText}
              inputProps={{
                "aria-label": "Search",
              }}
              onChange={(ev) => dispatch(setContactsSearchText(ev))}
            />
          </Paper>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default ContactsHeader;
