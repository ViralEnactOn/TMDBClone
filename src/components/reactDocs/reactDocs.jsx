/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Chat from "./Chat";
import ContactList from "./ContactList";

// Reacting to input with state
// function reactDocs() {
//   const [answer, setAnswer] = useState("");
//   const [error, setError] = useState(null);
//   const [status, setStatus] = useState("typing");

//   if (status === "success") {
//     return <h1>That's right!</h1>;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setStatus("submitting");
//     try {
//       await submitForm(answer);
//       setStatus("success");
//     } catch (err) {
//       setStatus("typing");
//       setError(err);
//     }
//   }

//   function handleTextareaChange(e) {
//     setAnswer(e.target.value);
//   }

//   return (
//     <>
//       <div className="flex justify-center flex-col bg-cyan-300">
//         <h2>City quiz</h2>
//         <p>
//           In which city is there a billboard that turns air into drinkable
//           water?
//         </p>
//         <form onSubmit={handleSubmit}>
//           <textarea
//             value={answer}
//             onChange={handleTextareaChange}
//             disabled={status === "submitting"}
//           />
//           <br />
//           <button disabled={answer.length === 0 || status === "submitting"}>
//             Submit
//           </button>
//           {error !== null && <p className="Error">{error.message}</p>}
//         </form>
//       </div>
//     </>
//   );
// }

// function submitForm(answer) {
//   // Pretend it's hitting the network.
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let shouldError = answer.toLowerCase() !== "lima";
//       if (shouldError) {
//         reject(new Error("Good guess but a wrong answer. Try again!"));
//       } else {
//         resolve();
//       }
//     }, 1500);
//   });
// }

// Choosing the state structure
// function reactDocs() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");

//   const fullName = firstName + " " + lastName;

//   function handleFirstNameChange(e) {
//     setFirstName(e.target.value);
//   }

//   function handleLastNameChange(e) {
//     setLastName(e.target.value);
//   }

//   return (
//     <>
//       <h2>Let’s check you in</h2>
//       <label>
//         First name: <input value={firstName} onChange={handleFirstNameChange} />
//       </label>
//       <label>
//         Last name: <input value={lastName} onChange={handleLastNameChange} />
//       </label>
//       <p>
//         Your ticket will be issued to: <b>{fullName}</b>
//       </p>
//     </>
//   );
// }

// Sharing state between components
// function reactDocs() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   return (
//     <>
//       <h2>Almaty, Kazakhstan</h2>
//       <Panel
//         title="About"
//         isActive={activeIndex === 0}
//         onShow={() => setActiveIndex(0)}
//       >
//         With a population of about 2 million, Almaty is Kazakhstan's largest
//         city. From 1929 to 1997, it was its capital city.
//       </Panel>
//       <Panel
//         title="Etymology"
//         isActive={activeIndex === 1}
//         onShow={() => setActiveIndex(1)}
//       >
//         The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for
//         "apple" and is often translated as "full of apples". In fact, the region
//         surrounding Almaty is thought to be the ancestral home of the apple, and
//         the wild <i lang="la">Malus sieversii</i> is considered a likely
//         candidate for the ancestor of the modern domestic apple.
//       </Panel>
//     </>
//   );
// }

// function Panel({ title, children, isActive, onShow }) {
//   return (
//     <section className="panel">
//       <h3>{title}</h3>
//       {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
//     </section>
//   );
// }

// Preserving and resetting state
// function reactDocs() {
//   const [to, setTo] = useState(contacts[0]);
//   return (
//     <div>
//       <ContactList
//         contacts={contacts}
//         selectedContact={to}
//         onSelect={(contact) => setTo(contact)}
//       />
//       <Chat contact={to} />
//     </div>
//   );
// }

// const contacts = [
//   { name: "Taylor", email: "taylor@mail.com" },
//   { name: "Alice", email: "alice@mail.com" },
//   { name: "Bob", email: "bob@mail.com" },
// ];

// State as a snapshot
// function reactDocs() {
//   const [to, setTo] = useState("Alice");
//   const [message, setMessage] = useState("Hello");

//   function handleSubmit(e) {
//     e.preventDefault();
//     setTimeout(() => {
//       alert(`You said ${message} to ${to}`);
//     }, 5000);
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         To:{" "}
//         <select value={to} onChange={(e) => setTo(e.target.value)}>
//           <option value="Alice">Alice</option>
//           <option value="Bob">Bob</option>
//         </select>
//       </label>
//       <textarea
//         placeholder="Message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button type="submit">Send</button>
//     </form>
//   );
// }

// Updating arrays in state
let nextId = 3;
const initialList = [
  { id: 0, title: "Big Bellies", seen: false },
  { id: 1, title: "Lunar Landscape", seen: false },
  { id: 2, title: "Terracotta Army", seen: true },
];

function reactDocs() {
  const [list, setList] = useState(initialList);

  function handleToggle(artworkId, nextSeen) {
    setList(
      list.map((artwork) => {
        if (artwork.id === artworkId) {
          return { ...artwork, seen: nextSeen };
        } else {
          return artwork;
        }
      })
    );
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList artworks={list} onToggle={handleToggle} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map((artwork) => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={(e) => {
                onToggle(artwork.id, e.target.checked);
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default reactDocs;
