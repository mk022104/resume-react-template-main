import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-phone-number-input/style.css';
import 'react-toastify/dist/ReactToastify.css';
import './contact.css';
import { trackPortfolioEvent } from '../../Analytics/plausibleAnalyticsUtils';
import { usePortfolioData } from '../../../context/PortfolioContext';
import { FaEnvelope, FaTag, FaUser } from 'react-icons/fa';
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="contact-modal-backdrop">
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-success-title"
      >
        <button
          onClick={onClose}
          className="contact-modal-close"
          aria-label="Dismiss success message"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const Contact = () => {
  const { contact } = usePortfolioData();
  const [input, setInput] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const maxCharacters = 500;
  const getPhoneNumberError = (value) =>
    value && !isPossiblePhoneNumber(value)
      ? 'This number has an invalid length for the selected country.'
      : '';
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setPhoneNumberError(getPhoneNumberError(value));
  };
  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const form = useRef();
  const useFocus = useRef(null);
  const focusInput = () => {
    useFocus.current?.focus();
  };
  useEffect(() => {
    focusInput(); //focus onload the page.
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    const phoneError = getPhoneNumberError(phoneNumber);
    if (!phoneNumber || phoneError) {
      setPhoneNumberError(phoneError);
      toast.error(
        'Please enter a phone number with a valid length for its country.'
      );
      return;
    }
    //Focus input onSubmit
    focusInput();
    setInput('');
    emailjs
      .sendForm(
        'service_7mcn71l',
        'template_35k6w7v',
        form.current,
        '_NtaKoGAAqdPTeVWv'
      )
      .then(
        (result) => {
          if (result) {
            setIsModalOpen(true);
            trackPortfolioEvent('generate_lead', {
              lead_source: 'contact_form',
              form_status: 'success',
            });
            console.log(result.text);
            setMessage('successfully sent email.');
            // toast.success("Contact successfully sent!!!",{ autoClose: false });
          }
        },
        (error) => {
          toast.error('Please fill contact details correctly', +error.message);
          trackPortfolioEvent('contact_form_failure', {
            error_type: error?.text ? 'email_service' : 'network_or_unknown',
          });
          setMessage('You are having errors to submit a form.' + error.message);
        }
      );
    e.target.reset();
    setPhoneNumber(undefined);
    setPhoneNumberError('');
  };
  const numberofCharacters = maxCharacters - input.length;
  const hasInvalidPhoneNumberLength = Boolean(phoneNumberError);
  return (
    <section className="contact-section">
        <form
          className="contact-form"
          ref={form}
          onSubmit={sendEmail}
          id="create-course-form"
        >
          <div className="contact-form-heading">
            <p className="contact-eyebrow">{contact.eyebrow}</p>
            <h3 className="contact-title">
              {contact.title}
            </h3>
            <p className="contact-intro">
              {contact.intro}
            </p>
          </div>
          <ToastContainer />
          <div className="contact-fields">
            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>
              <div className="contact-input-wrap">
                <FaUser className="contact-input-icon" aria-hidden="true" />
                <input
                  id="contact-name"
                  type="text"
                  ref={useFocus}
                  name="name"
                  maxLength="30"
                  placeholder="Your Name"
                  required
                  className="contact-control contact-control--icon"
                />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>
              <div className="contact-input-wrap">
                <FaEnvelope className="contact-input-icon" aria-hidden="true" />
                <input
                  id="contact-email"
                  type="email"
                  required
                  name="email"
                  placeholder="Your Email"
                  className="contact-control contact-control--icon"
                />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-phone">Phone</label>
              <PhoneInput
                id="contact-phone"
                className="contact-phone-input"
                defaultCountry="US"
                international
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                placeholder="Phone Number"
                aria-label="Phone Number"
                aria-invalid={Boolean(hasInvalidPhoneNumberLength)}
                aria-describedby={
                  hasInvalidPhoneNumberLength ? 'phone-number-error' : undefined
                }
              />
              <input type="hidden" name="phone" value={phoneNumber || ''} />
              {hasInvalidPhoneNumberLength && (
                <p
                  id="phone-number-error"
                  className="contact-phone-error"
                  role="alert"
                >
                  {phoneNumberError}
                </p>
              )}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-subject">Subject</label>
              <div className="contact-input-wrap">
                <FaTag className="contact-input-icon" aria-hidden="true" />
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  maxLength="100"
                  required
                  placeholder="Subject"
                  className="contact-control contact-control--icon"
                />
              </div>
            </div>
            <div className="contact-field contact-field--message">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                placeholder="Your Message"
                onChange={inputHandler}
                rows="6"
                maxLength={maxCharacters}
                aria-describedby="contact-message-count"
                className="contact-control contact-message"
              />
              <span className="contact-character-count" id="contact-message-count">
                {numberofCharacters} characters remaining
              </span>
            </div>
            <div className="contact-submit-row">
              <button type="submit" className="contact-submit-button">
                {contact.submitLabel}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </form>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="contact-success-icon" aria-hidden="true">
            <div className="contact-success-check" />
          </div>
          <div className="contact-success-copy">
            <p className="contact-eyebrow">Message sent</p>
            <h2 id="contact-success-title">Thank you!</h2>
            <p>{message}</p>
            <button onClick={handleCloseModal} className="contact-modal-action">
              Close
            </button>
          </div>
        </Modal>
    </section>
  );
};

export default Contact;
