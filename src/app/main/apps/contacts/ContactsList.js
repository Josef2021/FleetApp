import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactsMultiSelectMenu from "./ContactsMultiSelectMenu";
import ContactsTable from "./ContactsTable";
import {
  openEditContactDialog,
  removeContact,
  toggleStarredContact,
  selectContacts,
} from "./store/contactsSlice";

function ContactsList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const searchText = useSelector(
    ({ contactsApp }) => contactsApp.contacts.searchText
  );
  const user = useSelector(({ contactsApp }) => contactsApp.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: "Brand",
        accessor: "brand",
        className: "font-medium",
        sortable: true,
      },
      {
        Header: "Model",
        accessor: "model",
        className: "font-medium",
        sortable: true,
      },
      {
        Header: "Plate Number",
        accessor: "plateNumber",
        sortable: true,
      },
      {
        Header: "Assigned Status",
        accessor: "assignedStatus",
        sortable: true,
      },
      {
        Header: "Vehicle Status",
        accessor: "vehicleStatus",
        sortable: true,
      },
      {
        Header: "Total Cost",
        accessor: "totalCost",
        sortable: true,
      },
      {
        Header: "Mileage",
        accessor: "mileage",
        sortable: true,
      },
      {
        id: "action",
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                dispatch(removeContact(row.original.id));
              }}
              size="large"
            >
              <Icon>delete</Icon>
            </IconButton>
          </div>
        ),
      },
    ],
    [dispatch, user.starred]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return contacts;
      }
      return FuseUtils.filterArrayByString(contacts, _searchText);
    }

    if (contacts) {
      setFilteredData(getFilteredArray(contacts, searchText));
    }
  }, [contacts, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no contacts!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto w-full max-h-full"
    >
      <ContactsTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            dispatch(openEditContactDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default ContactsList;
