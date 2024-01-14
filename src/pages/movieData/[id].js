import { getSession, useSession } from "next-auth/react";
import MovieDetails from "@/components/MovieDetails";

const MovieDataDetailPage = ({ movie }) => {
  const { data: session } = useSession();
  const { user } = session || {};

  return <MovieDetails movie={movie} user={user? user : {}} />;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.params;

  try {
    const response = await fetch(`http://localhost:5000/singleMovieData/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: session?.token,
      }),
    });

    const data = await response.json();

    if (data.status === "ok" && data.data) {
      return {
        props: {
          movie: data.data,
        },
      };
    } else {
      console.error("Error fetching movie data:", data.data);
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return {
      notFound: true,
    };
  }
}

export default MovieDataDetailPage;
