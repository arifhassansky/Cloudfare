import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-green-400 p-2">
      <div className="max-w-6xl mx-auto px-4  flex justify-between">
        <Link href={"/"} className="text-3xl font-bold ">
          Cloufare
        </Link>
        <Link
          href={"/"}
          className="bg-white rounded-lg px-3 flex justify-center items-center"
        >
          About Us
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
