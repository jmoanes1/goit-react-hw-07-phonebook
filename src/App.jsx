// code with Redux-based App.jsx //

import React, { useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import { addContact, deleteContact, updateFilter, fetchContacts } from "./redux/contactsSlice";

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);
  const status = useSelector((state) => state.contacts.status);
  const error = useSelector((state) => state.contacts.error);

  // Fetch contacts on component mount
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // memoized filtered list
  const filteredContacts = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (q === "") return contacts;
    return contacts.filter((c) => c.name.toLowerCase().includes(q));
  }, [contacts, filter]);

  // passed to ContactForm: receives { name, number } and dispatches addContact
  const handleAddContact = useCallback(
    (contact) => {
      // basic validation: non-empty & duplicate prevention (case-insensitive)
      if (!contact.name.trim()) {
        alert("Please enter a name.");
        return;
      }
      const normalized = contact.name.trim().toLowerCase();
      const exists = contacts.some((c) => c.name.toLowerCase() === normalized);
      if (exists) {
        alert(`${contact.name} is already in contacts.`);
        return;
      }
      dispatch(addContact(contact));
    },
    [dispatch, contacts]
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteContact(id));
    },
    [dispatch]
  );

  const handleFilterChange = useCallback(
    (value) => {
      dispatch(updateFilter(value));
    },
    [dispatch]
  );

  const total = contacts.length;
  const shown = filteredContacts.length;

  // Render loading state
  if (status === 'loading' && contacts.length === 0) {
    return (
      <div className="app">
        <div className="container">
          <h1 className="title">Phonebook</h1>
          <div>Loading contacts...</div>
        </div>
      </div>
    );
  }

  // Render error state
  if (status === 'failed') {
    return (
      <div className="app">
        <div className="container">
          <h1 className="title">Phonebook</h1>
          <div className="error">Error: {error}</div>
          <button onClick={() => dispatch(fetchContacts())} className="button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Phonebook</h1>

        {/* Show loading indicator when fetching */}
        {status === 'loading' && <div className="loading">Updating contacts...</div>}

        <section className="card">
          <h2>Add contact</h2>
          <ContactForm onAdd={handleAddContact} />
        </section>

        <section className="card">
          <div className="list-header">
            <h2>Contacts</h2>
            {filter.trim() !== "" && (
              <div className="count">{`${shown} of ${total}`}</div>
            )}
          </div>

          <Filter value={filter} onChange={handleFilterChange} />

          <ContactList contacts={filteredContacts} onDelete={handleDelete} />
        </section>
      </div>
    </div>
  );
}

export default App;

// End of redux Apps.js //


//... This Code without Redux:...//

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import ContactForm from "./components/ContactForm";
// import ContactList from "./components/ContactList";
// import Filter from "./components/Filter";
// import "./App.css"; // import CSS

// // Default contacts
// const DEFAULT_CONTACTS = [
//   { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//   { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//   { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//   { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
// ];

// function App() {
//   // Load contacts from localStorage OR fallback to defaults
//   const [contacts, setContacts] = useState(() => {
//     const savedContacts = localStorage.getItem("contacts");
//     if (savedContacts) {
//       const parsed = JSON.parse(savedContacts);
//       return parsed.length > 0 ? parsed : DEFAULT_CONTACTS;
//     }
//     return DEFAULT_CONTACTS;
//   });

//   const [filter, setFilter] = useState("");

//   // Sync contacts with localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("contacts", JSON.stringify(contacts));
//   }, [contacts]);

//   // Add contact with validation
//   const addContact = useCallback((newContact) => {
//     const exists = contacts.some(
//       (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
//     );

//     if (exists) {
//       alert(`${newContact.name} is already in the contacts!`);
//       return;
//     }

//     setContacts([...contacts, { ...newContact, id: crypto.randomUUID() }]);
//   }, [contacts]);

//   // Delete contact
//   const deleteContact = useCallback((id) => {
//     setContacts((prevContacts) =>
//       prevContacts.filter((contact) => contact.id !== id)
//     );
//   }, []);

//   // Filter contacts
//   const filteredContacts = useMemo(() => 
//     contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     ), [contacts, filter]
//   );

//   // Contact statistics
//   const contactStats = useMemo(() => ({
//     total: contacts.length,
//     filtered: filteredContacts.length,
//     hasActiveFilter: filter.trim().length > 0
//   }), [contacts.length, filteredContacts.length, filter]);

//   return (
//     <div className="app">
//       <div className="main-card">
//         <h1 className="title">📞 Phonebook</h1>

//         <div className="section">
//           <ContactForm onAdd={addContact} />
//         </div>

//         <div className="section">
//           <h2>
//             Contacts 
//             <span className="contact-count">
//               ({contactStats.hasActiveFilter 
//                 ? `${contactStats.filtered} of ${contactStats.total}` 
//                 : contactStats.total})
//             </span>
//           </h2>
//           <Filter value={filter} onChange={setFilter} />
//         </div>

//         <div className="section">
//           <ContactList contacts={filteredContacts} onDelete={deleteContact} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
