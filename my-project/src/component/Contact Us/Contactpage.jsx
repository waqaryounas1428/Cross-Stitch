import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contactpage.css';

// ---- EDIT YOUR CONTACT INFO HERE ----
const contactInfo = [
  { icon: '📍', text: '45-50 Gulberg III Industrial Area Lahore, Pakistan' },
  { icon: '📞', text: '042-111-111-006' },
  { icon: '💬', text: '+92 302 8141555 (10AM to 5.30PM) Mon to Sat' },
  { icon: '✉️', text: 'sales@crossstitch.pk' }
];

const openingHoursText =
  'Our customer care representative will be available for support from (10AM to 5.30PM) Mon to Sat';

// ---- EDIT YOUR FORM FIELDS HERE ----
const formFields = [
  { name: 'name', label: 'Name', type: 'text', required: false },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: false }
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We're here to help you with any questions or concerns</p>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / Contact Us
        </div>
      </div>

      <div className="contact-container">

        {/* LEFT: Contact Info */}
        <div className="contact-info-side">
          <h2>Contact Crossstitch.Pk</h2>

          {contactInfo.map((item, index) => (
            <div className="info-item" key={index}>
              <span className="info-icon">{item.icon}</span>
              <p>{item.text}</p>
            </div>
          ))}

          <h3>Opening Hours</h3>
          <p className="opening-hours-text">{openingHoursText}</p>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="contact-form-side">
          <h2>Contact Form</h2>
          <p className="form-intro">
            We're happy to answer any question you have. Just send us a message in the form with any questions you may have.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              {formFields.slice(0, 2).map((field) => (
                <div className="form-group" key={field.name}>
                  <label htmlFor={field.name}>
                    {field.label} {field.required && <span className="required">*</span>}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                </div>
              ))}
            </div>

            {formFields.slice(2).map((field) => (
              <div className="form-group full-width" key={field.name}>
                <label htmlFor={field.name}>
                  {field.label} {field.required && <span className="required">*</span>}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              </div>
            ))}

            <div className="form-group full-width">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              SEND MESSAGE
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;