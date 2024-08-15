import imgContact from "../../assets/images/contact.jpg";
import logo from "../../../src/assets/images/contact.png";
import Swal from "sweetalert2";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    Swal.fire({
      position: window.innerWidth <= 768 ? "top" : "top right",
      width: "auto",
      padding: "1rem",
      showCloseButton: false,
      showCancelButton: false,
      text: "Your message has been sent",
      icon: "success",
      timer: 3000,
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${imgContact})`,
        backgroundSize: "100% 100%",
        width: "99vw",
        height: "100vh",
      }}
      className="min-h-screen px-4 rounded-xl flex flex-col justify-center py-12 mt-6 md:mt-0 sm:px-6 lg:px-8 mb-24 md:mb-0"
    >
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={logo} />
        <title>SurveySeeker || ContactUs</title>
      </Helmet>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className=" md:pt-0 text-center text-3xl md:text-4xl lg:text-4xl font-extrabold text-gray-900 uppercase">
          Contact Us
        </h2>
        <div className="sm:mt-3 md:mt-6 rounded-xl bg-[#c7d5ab] py-4 lg:py-8 px-4 lg:px-8 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="sm:space-y-1 lg:space-y-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                style={{ fontSize: "1.25rem", padding: "0.75rem" }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                style={{ fontSize: "1.25rem", padding: "0.75rem" }}
              />
            </div>
            <div className="">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                style={{ fontSize: "1rem", padding: "0.75rem" }}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                style={{ fontSize: "1.25rem", padding: "0.75rem" }}
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 lg:font-semibold">
              For any inquiries, please feel free to contact us.
            </p>
            <p className="text-sm text-gray-600 lg:font-semibold">
              We will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
