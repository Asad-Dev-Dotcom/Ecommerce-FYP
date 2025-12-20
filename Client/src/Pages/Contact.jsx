import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { Link } from "react-router-dom";

function Contact()
{
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-35 py-10 ">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-24">
        <Link to="/" className="text-gray-400 hover:text-red-500">Home</Link> / <span className="text-black">Contact</span>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Info Box */}
        <div className="col-span-1 rounded-md shadow-sm ">
          {/* Call To Us */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-500 p-3 rounded-full text-white text-xl">
                <BsTelephone />
              </div>
              <h3 className="text-lg font-semibold">Call To Us</h3>
            </div>
            <p className="text-sm text-gray-600 mt-5">We are available 24/7, 7 days a week.</p>
            <p className="text-sm text-gray-600 mt-3">Phone: +8801811122222</p>
          </div>

          {/* Separator Line */}
          <div className="border-t border-gray-300 mx-4 sm:mx-6"></div>

          {/* Write To Us */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-500 p-3 rounded-full text-white text-xl">
                <MdOutlineEmail />
              </div>
              <h3 className="text-lg font-semibold">Write To US</h3>
            </div>
            <p className="text-sm text-gray-600 mt-5">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <div className="text-sm text-gray-600 mt-2">
              <p className="mb-3">
                Emails: <a href="mailto:customer@exclusive.com" className="text-blue-500">customer@exclusive.com</a>
              </p>
              <p>
                Emails: <a href="mailto:support@exclusive.com" className="text-blue-500">support@exclusive.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Box */}
        <div className="md:col-span-2 p-4 sm:p-6 rounded-md shadow-sm ">
          <form className="space-y-6">
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="w-full px-4 py-2 rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100"
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="w-full px-4 py-2 rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100"
              />
              <input
                type="tel"
                placeholder="Your Phone *"
                className="w-full px-4 py-2 rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100"
              />
            </div>

            {/* Message */}
            <textarea
              placeholder="Your Message"
              className="w-full min-h-[190px] px-4 py-3 rounded-lg text-sm md:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 resize-none"
            />

            {/* Button */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Contact;