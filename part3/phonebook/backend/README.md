## README ##

The app is deployed at: https://phonebook-xqu9.onrender.com/.

### View all contacts

Go to https://phonebook-xqu9.onrender.com/api/persons/ to see a full list of the phonebook contacts.

### Fetch a single contact

Go to https://phonebook-xqu9.onrender.com/api/persons/:id to get the data for a single contact.

### Create a new contact

You can create a contact by making a POST request to: https://phonebook-xqu9.onrender.com/api/persons/. The API expects the contact in JSON format. The contact needs to have a `name` and a `number` field.

### Delete a contact

You can delete a contact by making a DELETE request to: https://phonebook-xqu9.onrender.com/api/persons/:id (where `:id` is replaced by the contact's `id` property).