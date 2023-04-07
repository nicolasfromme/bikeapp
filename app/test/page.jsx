"use client"
import { useMutation } from '@apollo/client';

import { useQuery, gql } from '@apollo/client';

// const GET_BIKE_STORES = gql`
//   query {
//     getBikeStores {
//       id
//       name
//     }
//   }
// `;

const ADD_ORDER = gql`
  mutation {
    addOrder(input: {
      bike: "642d151b212acfeef285ade1",
      customer: "642d151b212acfeef285ade1",
      date: "2023-03-17T09:00:00.000Z",
      price: 500
    }) {
      id
      bike {
        id
        brand
        model
      }
      customer {
        id
        firstname
        lastname
      }
      date
      price
    }
  }
`;

export default function MyComponent() {
  const [addOrder, { loading, error, data }] = useMutation(ADD_ORDER);

  const handleAddOrder = async () => {
    try {
      const result = await addOrder();
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <button onClick={handleAddOrder}>Add Order</button>
      { <p>Order added!</p>}
    </div>
  );
}


// // Komponente B
// function ComponentB({ onTextChange }) {
//   const [text, setText] = useState("");

//   const handleTextChange = (event) => {
//     const newText = event.target.value;
//     setText(newText);
//     onTextChange(newText); // Aufruf der Funktion in Komponente A mit dem neuen Text
//   };

//   return (
//     <div>
//       <input type="text" value={text} onChange={handleTextChange} />
//     </div>
//   );
// }

// // Komponente A
// function ComponentA() {
//   let store = "";
//   const handleTextChange = (newText) => {
//     store = newText;
//     console.log(`Neuer Text: ${newText}`);
//     // hier kann die Komponente A den neuen Text verwenden oder speichern
//   };

//   const handleClick = () => {
//     handleTextChange(store); // hier wird die Funktion in Komponente B aufgerufen
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>Textfeld aktualisieren</button>
//       <ComponentB onTextChange={handleTextChange} />
//     </div>
//   );
// }
