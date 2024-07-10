import React, { useRef,useState,useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./contact.css"
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      
      <div className="bg-white p-5 rounded-lg shadow-lg relative l:w-96	w-72 ml-0 md:w-96 md:ml-24 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-600 text-lg">&times;</button>
        {children}
      </div>
    </div>
  );
};


const Contact = () => {
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [message, setMessage] = useState('');

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const form = useRef();
  const useFocus=useRef(null);
  const focusInput=()=>{
    if(useFocus.current){
      useFocus.current.focus();
    }
  }
  useEffect(()=>{
    focusInput()//focus onload the page.
  },[])

  const sendEmail = (e) => {
    e.preventDefault();
    //Focus input onSubmit
    focusInput()
    emailjs
      .sendForm(
        "service_dr6helr",
        "template_sbkquck",
        form.current,
        "s67cWdfEwD0mib1iF"
      )
      .then(result=>{
        if(result){
          setIsModalOpen(true);
          console.log(result.text);
          setMessage('successfully sent email.');
          // toast.success("Contact successfully sent!!!",{ autoClose: false });
        }},
        (error) => {
          toast.error("Please fill contact details correctly",+error.message);
          setMessage('You are having errors to submit a form.'+error.message);

        }
      );
    e.target.reset();
  };

  return (
    <section className="pb-10">
      <div className="flex flex-wrap md:px-4">
        <form
          className="p-8 md:mx-4 bg-white rounded-md shadow-md"
          ref={form}
          onSubmit={sendEmail}
          id="create-course-form"
        >
          <div className="m-3">
            <h3 className="text-2xl text-gray-800 font-bold mb-6 hover:text-indigo-400">
              Get in Touch
            </h3>
          </div>
          <ToastContainer />
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2">
              <div className="m-3">
                <input
                  type="text"
                  ref={useFocus}
                  name="user_name"
                  maxlength = "30"
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-800 rounded py-4 px-6 text-sm bg-white"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="m-3">
                <input
                  type="email"
                  required
                  name="user_email"
                  placeholder="Your Email"
                  className="w-full border border-gray-800 rounded py-4 px-6 text-sm bg-white"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="m-3">
                <input
                  type="text"
                  name="user_phone"
                  maxlength = "10"
                  pattern="^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$"
                  required
                  placeholder="Phone Number"
                  className="w-full border border-gray-900 rounded py-4 px-6 text-sm bg-white"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="m-3">
                <input
                  type="text"
                  name="user_subject"
                  maxlength = "100"
                  required
                  placeholder="Subject"
                  className="w-full border border-gray-800 rounded py-4 px-6 text-sm bg-white"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="m-3">
                <textarea
                  name="user_message"
                  required
                  placeholder="Your Message"
                  onChange={inputHandler}
                  rows="6"
                  maxLength="500"
                  className="w-full border border-gray-800 rounded py-4 px-6 text-sm bg-white"
                />
                <span className="charLeft">{500 - input.length} Characters</span>
              </div>
            </div>
            <div className="w-full">
              <div className="m-3 text-right">
                <input
                  type="submit"
                  value="Send"
                  className="rounded bg-purple-900 text-center border-0 py-3 px-6 text-white leading-7 tracking-wide hover:bg-purple-800 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </form>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div class="wrapper">
            <div class="circle">
              <div class="checkMark"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-alignment">Success!!</h2>
          <p className="mb-4 text-alignment">{message}</p>
          <button
            onClick={handleCloseModal}
            className="sticky bg-green-900 text-white p-2 rounded float-right"
          >
            Close
          </button>
        </Modal>
      </div>
    </section>
  );
};

export default Contact;
