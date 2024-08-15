/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/utils";
// import { FaGithub } from "react-icons/fa";
// import bg from "../../assets/images/signup.jpg";
import bg from "../../assets/images/signup.jpg";

import logo from "../../assets/images/register.png";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const SignUp = () => {
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();
  const { createUser, googleSignIn, updateUserProfile,
    //  githubSignIn 
    } =
    useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    try {
      // 1. Upload image and get image url
      const image_url = await imageUpload(image);
      // 2. User Registration
      const result = await createUser(email, password);

      // 3. Save username and photo in firebase
      await updateUserProfile(name, image_url);
      navigate("/");
      // 4. Prepare user info
  const userInfo = {
    name: name,
    email: email,
    photo: image_url,
    role: 'user'
};
const res = await axiosCommon.put('/users', userInfo);

            Swal.fire({
          position: "top",
          icon: "success",
          title: "User created successfully",
          showConfirmButton: false,
          timer: 1500
      });
    } catch (err) {
      toast.error(err.message);
    }

// another method
// try {
//   // 1. Upload image and get image URL
//   const image_url = await imageUpload(image);

//   // 2. User Registration
//   const result = await createUser(email, password);
//   console.log(result.user);

//   // 3. Save username and photo in Firebase
//   await updateUserProfile(name, image_url);

//   // 4. Prepare user info
//   const userInfo = {
//       name: name,
//       email: email,
//       photo: image_url,
//       role: 'user'
//   };

//   // 5. Update user info on the server
//   const res = await axiosCommon.put('/users', userInfo);
//   if (res.data.insertedId) {
//       console.log('User added to the database');

//       // 6. Show success message
//       Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "User created successfully",
//           showConfirmButton: false,
//           timer: 1500
//       });

//       // 7. Navigate to the home page
//       navigate("/");
//   }
// } catch (error) {
//   console.error("Error:", error);

//   // Show error message
//   Swal.fire({
//       title: "Error!",
//       text: error.message,
//       icon: "error",
//       confirmButtonText: "Ok",
//   });
// }



  };

  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      // 1. Google sign in from firebase
      const result = await googleSignIn();
      console.log(result.user);

      // 2. Prepare user info
      const userInfo = {
        email: result?.user?.email,
        name: result?.user?.displayName,
        photo: result?.user?.photoURL,
        role: "user",
      };

      // 3. Update user info on the server
      const res = await axiosCommon.put("/users", userInfo);
      console.log(res.data);

      // 4. Show success message
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // 5. Navigate to the appropriate location
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      console.log(error);

      // 6. Show error message
      Swal.fire({
        title: "Error!",
        text: "Invalid email or password",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  // const handleGithubLogin = async () => {
  //   try {
  //     // 1. Google sign in from firebase
  //     const result = await githubSignIn();
  //     console.log(result.user);

  //     // 2. Prepare user info
  //     const userInfo = {
  //       email: result?.user?.email,
  //       name: result?.user?.displayName,
  //       photo: result?.user?.photoURL,
  //       role: "user",
  //     };

  //     // 3. Update user info on the server
  //     const res = await axiosCommon.put("/users", userInfo);
  //     console.log(res.data);

  //     // 4. Show success message
  //     Swal.fire({
  //       position: "top",
  //       icon: "success",
  //       title: "Login successfully",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });

  //     // 5. Navigate to the appropriate location
  //     navigate(location?.state ? location.state : "/");
  //   } catch (error) {
  //     console.log(error);

  //     // 6. Show error message
  //     Swal.fire({
  //       title: "Error!",
  //       text: "Invalid email or password",
  //       icon: "error",
  //       confirmButtonText: "Ok",
  //     });
  //   }
  // };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
      className="min-h-screen px-4 bg-gray-600 rounded-xl flex flex-col items-center justify-center py-12 mt-6 md:mt-0 sm:px-6 lg:px-8 mb-24 md:mb-0"
    >
      <Helmet>
        <link rel="shortcut icon" href={logo} type="image/x-icon" />
        <title>SurveySeeker || SignUp</title>
      </Helmet>

      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 text-white">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-400">Welcome to SurveySeeker</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image:
                </label>
                <input
                  required
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500 bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-orange-500 w-full border-0 rounded-md py-3 text-white"
              >
                SignUp Now
              </button>
            </div>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              SignUp with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
          >
            <FcGoogle size={32} />

            <p>Continue with Google</p>
          </button>
          {/* <button
            onClick={handleGithubLogin}
            className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
          >
            <FaGithub size={28} />

            <p>Continue with GitHub</p>
          </button> */}
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline hover:text-rose-500 text-orange-600"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;




