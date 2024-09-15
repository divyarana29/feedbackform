import React from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FirstPage = () => {
  return (
    <div className="w-screen bg-[#c66e48] py-10 px-10 h-screen flex items-center justify-center">
      <div className="text-center p-6 rounded-lg">
        <div className="bg-white box-border p-4 mx-1.5 my-1.5 flex ">
          <div className="my-11 mx-11 items-center justify-center content-center"  >
        <div className="text-5xl font-extrabold text-[#c66e48] mb-4">
          Feed Back !
        </div >
        <div  className="w=1/2">
        <div className="mt-2 text-lg text-black-700">
        We all need people who will give us feedback. That’s how we improve
        </div>
        
        { <Link to={'/form'}>
          <button className="mt-6 bg-[#c66e48] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#81310e] transition duration-300 ease-in-out">
            Start
          </button>
        </Link> }</div></div>

        
        <div className="w=1/2">
        <img
        class="object-cover object-center h-96"
        src="https://th.bing.com/th/id/R.0642236432e389eedb15755637ead478?rik=q6Ak4WizMJpZSw&riu=http%3a%2f%2fwww.photos-public-domain.com%2fwp-content%2fuploads%2f2010%2f10%2fwhite_daisies.jpg&ehk=jZkzIHbjcmh8Ls4q5XxOhfF2JfqUivm8ziRwBpl0JOI%3d&risl=&pid=ImgRaw&r=0"
        alt="nature image"
      />
      </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
