import Navbar from "@/components/navbar";

const HomePage = () => {
  return (
<div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
      <h1 className="flex text-center font-extrabold font-serif text-9xl justify-around">
      HomePage
      </h1>
      </div>

    </div>
  );
};

export default HomePage;
