"use client"
import { useMutation } from '@apollo/client';

import { useQuery, gql } from '@apollo/client';

import { use } from 'react';

// const GET_BIKE_STORES = gql`
//   query {
//     getBikeStores {
//       id
//       name
//     }
//   }
// `;

// const ADD_ORDER = gql`
// mutation {
//   addOrder(input: {
//     customer: "6430196df543f809796bbb1a",
//     bike: "6430196df543f809796bbb1a",
//     date: "2023-03-17T09:00:00.000Z",
//     price: 500
//   }) {
//     customer
//     bike
//     date
//     price
//   }
// }
// `;

const ADD_ORDER = gql`
  mutation AddOrder($input: OrderInput!) {
    addOrder(input: $input) {
          customer
          bike
          date
          price
    }
  }
`;

export default function MyComponent() {
  const [addOrder, { loading, error, data }] = useMutation(ADD_ORDER);

  const testId = "6430196df543f809796bbb1a";

  const handleAddOrder = async () => {
    try {
      const result = await addOrder({
        variables: {
          input: {
            bike: testId,
            customer: testId,
            date: "now",
            price: 500,
          },
        },
      });
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



function About() {
    const data = use(query_stores())
    console.log(data.props.data)
    return (
        <div>
            <h1 className="text-black">Store:</h1>
            <ul className="text-black">
                {data.props.data.getBikeStores.map(store => (
                    <li key={store.id}>{store.name}</li>
                ))}
            </ul>
        </div>

    )
}

async function query_stores() {
    const apolloClient = getClient()
    const { data } = await apolloClient.query({
        query: gql`
           query {
             getBikeStores {
             id
               name
             }
           }
        `,
    });
    return {
        props: {
            data,
        },
    };
}
