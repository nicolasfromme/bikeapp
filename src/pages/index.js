import Image from 'next/image'
import { Inter } from '@next/font/google'

import { gql } from "@apollo/client";
import client from "./apolloclient";

const inter = Inter({ subsets: ['latin'] })

export default function Home({ users }) {
  return (
    <main >


    </main>
  )
}
/*
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
    {
      getUsers{
        id
        login
        avatar_url
      }
    }
    `,
  });
  console.log(data)
  return {
    props: {
      users: data.getUsers,
    },
  };
}
*/