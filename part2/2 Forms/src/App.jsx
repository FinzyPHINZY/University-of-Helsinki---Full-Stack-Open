import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import PersonsService from "./services/persons";

// Change the functionality so that if a number is added to an already existing person, the added number replaces the previous number. The replacement should be done with an HTTP PUT request.

// if number is added to existing person. --- if person.name === newName ==> accept adding new name but edit the number with a put request.

// If the person's information is already in the list, the program can ask the user for confirmation:

const App = () => {
  // States
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1231244" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterStr, setFilterStr] = useState("");
  const [filterArr, setFilterArr] = useState([]);

  useEffect(() => {
    console.log("effect");
    PersonsService.getAll()
      .then((res) => {
        const persons = res.data;
        setPersons(persons);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle changes in NAME input
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  // Handle changes in NUMBER input
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  // Add new contact to contact list
  const addPerson = (e) => {
    e.preventDefault();
    const newContact = { name: newName, number: newNumber };

    // Check if newContact exists
    const isContactExisting = persons.some(
      (person) => person.name === newContact.name
    );

    if (isContactExisting) {
      const existingContact = persons.find(
        (person) => person.name === newContact.name
      );

      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const changedPerson = { ...existingContact, number: newContact.number };

        PersonsService.update(existingContact.id, changedPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingContact.id ? person : updatedPerson.data
              )
            );
          })
          .catch(
            (error) => (
              alert(`Error updating ${existingContact.name}`),
              console.error(error.message)
            )
          );
      }
    } else {
      PersonsService.create(newContact)
        .then((response) => {
          setPersons(persons.concat(response.data));
          console.log(response);
          console.log("successfully added new contact");
          setNewName(""), setNewNumber("");
        })
        .catch((error) => console.error("Error adding contact:", error));
    }
  };

  // Delete contact from contact list
  const deleteContact = (person) => {
    const id = person.id;
    console.log(id);
    if (window.confirm(`Delete ${person.name}?`))
      PersonsService.remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          console.log(`Deleted contact: ${person.name}`);
        })

        .catch((error) => {
          console.error(`Error deleting ${person.name}`, error);
        });
  };

  //  Filter contacts with searh input
  const handleFiltering = (e) => {
    const str = e.target.value.toLowerCase();
    setFilterArr(
      persons.filter((person) => person.name.toLowerCase().includes(str))
    );
    setFilterStr(str);
  };

  // Generate Contacts list items from existing state
  const names = persons.map((person, i) => (
    <p key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={() => deleteContact(person)}>delete</button>
    </p>
  ));

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Search for contact */}
      <Filter
        handler={handleFiltering}
        contactList={filterArr}
        searchStr={filterStr}
      />

      {/* Add new contact */}
      <h3>Add a new contact</h3>

      <PersonForm
        formHandler={addPerson}
        name={newName}
        number={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
      />

      {/* Rendering Contacts*/}
      <h3>Numbers</h3>
      {filterStr ? (
        filterArr.map((person, i) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))
      ) : (
        <Persons contacts={names} handleDelete={deleteContact} />
      )}
    </div>
  );
};

export default App;
