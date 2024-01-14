import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const Login = () => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const imageArray = [
      "/LoginBG0.jpg",
      "/LoginBG1.jpg",
      "/LoginBG2.jpg",
      "/LoginBG3.jpg",
      "/LoginBG4.jpg",
      "/LoginBG5.jpg",
      "/LoginBG6.jpg",
      "/LoginBG7.jpg",
      "/LoginBG8.jpg",
      "/LoginBG9.jpg",
    ];
    const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
    setBackgroundImage(randomImage);
  }, []);

  return (
    <div style={{
      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, .8) 0, transparent 60%, rgba(0, 0, 0, .8)), url(${backgroundImage})`,
      backgroundSize: "cover",
      height: "100vh",
      position: "relative",
    }}>
      <Image
        src="/logo.png"
        alt="dp"
        width={200}
        height={200}
        className="absolute top-10 left-10"
      />

      <div className="flex items-center justify-center h-screen">
        <div className="bg-[rgba(0,0,0,0.75)] p-10 w-80 space-y-6">
          <h2 className="text-3xl font-medium">Sign in</h2>

          <button
            className="bg-white text-black flex gap-2 items-center p-4 text-xl"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="text-3xl" />
            SignIn with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
