import Head from "next/head";
import React, {useState} from 'react';
import { getSession, useSession } from "next-auth/react";
import Login from "@/components/Login";
import Hero from "@/components/Hero";
import Row from "@/components/Row";

export default function Home({
  moviePosters
}) {  
  const [movie, setMovie] = useState(null);
  const { data: session } = useSession();
  if (!session) return <Login />;
  return (
    <>
    <Head>
        <title>Arynam</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/site-logo.png" />
    </Head>
    <main className="relative bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Hero moviePosters={moviePosters} movie={movie} setMovie={setMovie}/>
      <section>
          <Row movie={movie}/>
        </section>

    </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
