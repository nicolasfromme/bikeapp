"use client"
//import { useUser } from '@auth0/nextjs-auth0/client';
//import { gql, useQuery } from "@apollo/client";
//import client from "../../apolloclient";

export default function Router({ role }) {
    /*
    const { user, error, isLoading } = useUser();
    console.log("user: " + user)

    const { data } = useQuery(gql`
        {
            getLoggedInUserRole(id: "auth0|63ffd2bd022bc051ed2785cc") {
                role
            }
        }
        `,
    );
    console.log(data)
    console.log(data.getLoggedInUserRole.role)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (!user) return <div>Access Denied<a href="/api/auth/login">Login</a></div>;
    
    /*
    if(role === "Chef"){
        useRouter().push('/admin/dashboard')
    } else if(role === "employee"){
        useRouter().push('/admin/employee/[employee]')
    } else if (role === "store_manager") {
        useRouter().push('/admin/store/[store]/employees')
    } else if (role === "customer") {
        //route to customer dashboard
    } 
    */
    
    return(
        <div>
            <h1>Weiterleiten...</h1>
        </div>
    )
} 

/*
export async function getStaticProps() {
    const { data } = await client.query({
        query: gql`
        {
            getLoggedInUserRole(id: "auth0|63ffd2bd022bc051ed2785cc") {
                role
            }
        }
        `,
    });
    console.log(data)
    console.log(data.getLoggedInUserRole.role)
    return {
      props: {
        role: data.getLoggedInUserRole.role,
      },
    };
  }
  */