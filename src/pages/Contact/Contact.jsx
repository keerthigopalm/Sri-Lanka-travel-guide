import { useState } from "react";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim() || form.subject.trim().length < 4) {
      newErrors.subject = "Subject must be at least 4 characters.";
    }
    if (!form.message.trim() || form.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Simulate submit (no backend)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <h1>Contact Us</h1>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="contact-success">
              <FiCheckCircle size={56} />
              <h2>Message Sent!</h2>
              <p>
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", subject: "", message: "" });
                }}
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Have a question or suggestion? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="section">
        <div className="container contact-layout">
          <div className="contact-form-wrap card">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit} noValidate className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`form-input ${errors.name ? "form-input--error" : ""}`}
                  aria-required="true"
                  aria-describedby={errors.name ? "name-error" : undefined}
                  autoComplete="name"
                />
                {errors.name && (
                  <span id="name-error" className="form-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`form-input ${errors.email ? "form-input--error" : ""}`}
                  aria-required="true"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <span id="email-error" className="form-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject <span aria-hidden="true">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className={`form-input ${errors.subject ? "form-input--error" : ""}`}
                  aria-required="true"
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && (
                  <span id="subject-error" className="form-error" role="alert">
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here…"
                  className={`form-input form-textarea ${errors.message ? "form-input--error" : ""}`}
                  aria-required="true"
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                <span className="form-hint">
                  {form.message.length} / 20 characters minimum
                </span>
                {errors.message && (
                  <span id="message-error" className="form-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              <button type="submit" className="btn btn-primary contact-submit">
                <FiSend />
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-info">
            <div className="card contact-info-card">
              <h3>Get in Touch</h3>
              <div className="contact-detail">
                <span>📍</span>
                <div>
                  <strong>Address</strong>
                  <p>Colombo 7, Western Province, Sri Lanka</p>
                </div>
              </div>
              <div className="contact-detail">
                <span>📧</span>
                <div>
                  <strong>Email</strong>
                  <p>info@sltravelguide.lk</p>
                </div>
              </div>
              <div className="contact-detail">
                <span>📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>+94 11 234 5678</p>
                </div>
              </div>
              <div className="contact-detail">
                <span>🕐</span>
                <div>
                  <strong>Hours</strong>
                  <p>Mon–Fri: 9:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
