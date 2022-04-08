import FuseUtils from "@fuse/utils";
import _ from "@lodash";
import mock from "../mock";

const contactsDB = {
  contacts: [
    {
      id: "5725a680b3249760ea21de52",
      brand: "Volvo",
      model: "Keitch",
      plateNumber: "ABC",
      assignedStatus: "yes",
      vehicleStatus: "active",
      serviceCost: "$300,000",
      fuelCost: "$20,000",
      mileage: "10,000",
    },
    {
      id: "5725a680606588342058356d",
      brand: "Toyota",
      model: "Keitch",
      plateNumber: "ABC",
      assignedStatus: "yes",
      vehicleStatus: "inactive",
      serviceCost: "$300,000",
      fuelCost: "$20,000",
      mileage: "10,000",
    },
    {
      id: "5725a68009e20d0a9e9acf2a",
      brand: "Lexus",
      model: "RX450h",
      plateNumber: "CCC",
      assignedStatus: "yes",
      vehicleStatus: "In shop",
      serviceCost: "$300,000",
      fuelCost: "$20,000",
      mileage: "10,000",
    },
    {
      id: "5725a6809fdd915739187ed5",
      brand: "Mercedes",
      model: "Keitch",
      plateNumber: "XYZ",
      assignedStatus: "no",
      vehicleStatus: "active",
      serviceCost: "$300,000",
      fuelCost: "$20,000",
      mileage: "10,000",
    },
    {
      id: "5725a68007920cf75051da64",
      brand: "Honda",
      model: "Keitch",
      plateNumber: "XYZ",
      assignedStatus: "no",
      vehicleStatus: "inactive",
      serviceCost: "$300,000",
      fuelCost: "$20,000", 
      mileage: "10,000",
    },
  ],
  user: [
    {
      id: "5725a6802d10e277a0f35724",
      name: "John Doe",
      avatar: "assets/images/avatars/profile.jpg",
      starred: [
        "5725a680ae1ae9a3c960d487",
        "5725a6801146cce777df2a08",
        "5725a680bbcec3cc32a8488a",
        "5725a680bc670af746c435e2",
        "5725a68009e20d0a9e9acf2a",
      ],
      frequentContacts: [
        "5725a6809fdd915739187ed5",
        "5725a68031fdbb1db2c1af47",
        "5725a680606588342058356d",
        "5725a680e7eb988a58ddf303",
        "5725a6806acf030f9341e925",
        "5725a68034cb3968e1f79eac",
        "5725a6801146cce777df2a08",
        "5725a680653c265f5c79b5a9",
      ],
      groups: [
        {
          id: "5725a6802d10e277a0f35739",
          name: "Friends",
          contactIds: [
            "5725a680bbcec3cc32a8488a",
            "5725a680e87cb319bd9bd673",
            "5725a6802d10e277a0f35775",
          ],
        },
        {
          id: "5725a6802d10e277a0f35749",
          name: "Clients",
          contactIds: [
            "5725a680cd7efa56a45aea5d",
            "5725a68018c663044be49cbf",
            "5725a6809413bf8a0a5272b1",
            "5725a6803d87f1b77e17b62b",
          ],
        },
        {
          id: "5725a6802d10e277a0f35329",
          name: "Recent Workers",
          contactIds: [
            "5725a680bbcec3cc32a8488a",
            "5725a680653c265f5c79b5a9",
            "5725a6808a178bfd034d6ecf",
            "5725a6801146cce777df2a08",
          ],
        },
      ],
    },
  ],
};

mock.onGet("/api/contacts-app/contacts").reply((config) => {
  const { id } = config.params;
  let response = [];
  switch (id) {
    case "frequent": {
      response = contactsDB.contacts.filter((contact) =>
        contactsDB.user[0].frequentContacts.includes(contact.id)
      );
      break;
    }
    case "starred": {
      response = contactsDB.contacts.filter((contact) =>
        contactsDB.user[0].starred.includes(contact.id)
      );
      break;
    }
    default: {
      response = contactsDB.contacts;
    }
  }
  return [200, response];
});

mock.onGet("/api/contacts-app/user").reply((config) => {
  return [200, contactsDB.user[0]];
});

mock.onPost("/api/contacts-app/add-contact").reply((request) => {
  const { contact } = JSON.parse(request.data);
  const newContact = {
    ...contact,
    id: FuseUtils.generateGUID(),
  };
  contactsDB.contacts = [...contactsDB.contacts, newContact];
  return [200, newContact];
});

mock.onPost("/api/contacts-app/update-contact").reply((request) => {
  const { contact } = JSON.parse(request.data);

  contactsDB.contacts = contactsDB.contacts.map((_contact) => {
    if (contact.id === _contact.id) {
      return contact;
    }
    return _contact;
  });

  return [200, contact];
});

mock.onPost("/api/contacts-app/remove-contact").reply((request) => {
  const { contactId } = JSON.parse(request.data);
  contactsDB.contacts = contactsDB.contacts.filter(
    (contact) => contactId !== contact.id
  );

  return [200, contactId];
});

mock.onPost("/api/contacts-app/remove-contacts").reply((request) => {
  const { contactIds } = JSON.parse(request.data);
  contactsDB.contacts = contactsDB.contacts.filter(
    (contact) => !contactIds.includes(contact.id)
  );
  return [200, contactIds];
});

mock.onPost("/api/contacts-app/toggle-starred-contact").reply((request) => {
  const { contactId } = JSON.parse(request.data);
  contactsDB.user[0].starred = _.xor(contactsDB.user[0].starred, [contactId]);
  return [200, contactId];
});

mock.onPost("/api/contacts-app/toggle-starred-contacts").reply((request) => {
  const { contactIds } = JSON.parse(request.data);
  contactsDB.user[0].starred = _.xor(contactsDB.user[0].starred, contactIds);
  return [200, contactIds];
});

mock.onPost("/api/contacts-app/set-contacts-starred").reply((request) => {
  const { contactIds } = JSON.parse(request.data);

  contactsDB.user[0].starred = [...contactsDB.user[0].starred, ...contactIds];

  return [200, contactIds];
});

mock.onPost("/api/contacts-app/set-contacts-unstarred").reply((request) => {
  const { contactIds } = JSON.parse(request.data);

  contactsDB.user[0].starred = contactsDB.user[0].starred.filter(
    (contactId) => !contactIds.includes(contactId)
  );

  return [200, contactIds];
});
