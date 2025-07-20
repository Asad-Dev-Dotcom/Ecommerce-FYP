import { Link } from "react-router-dom";

export default function NotFound()
{
  return (

    <div className="flex flex-col justify-center items-center text-center p-40">

      <h1 className="text-8xl font-bold mb-4">404 Not Found</h1>
      <p className="text-gray-600 text-lg mb-6 mt-5">
        Your visited page was not found. You may go to the home page.
      </p>
      <Link
        to="/"
        className="w-60 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition-all mt-7"
      >
        Back to Home page
      </Link>
    </div>
  );
}
