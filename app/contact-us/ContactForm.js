"use client";
import styles from "./ContactUs.module.css";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin']
});

export default function ContactForm() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      alert(result.message);
      e.target.reset();
    } catch (err) {
      alert("Failed to send email. Try again later.");
    }
  };

  return (
    <div className={`${styles.formWrapper} ${roboto.className}`}>
      <h2 className={styles.title}>Launch your vision</h2>
      <p className={styles.leadText}>Let’s get started.</p>

      <hr className={styles.hrLine} />

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <label>
          Name *
          <div className={styles.nameRow}>
            <input type="text" name="first_name" placeholder="First Name" className={styles.textInput} required />
            <input type="text" name="last_name" placeholder="Last Name" className={styles.textInput} />
          </div>
        </label>

        <label>
          Company
          <input type="text" name="company" placeholder="Company" className={styles.textInput} />
        </label>

        <label>
          Email *
          <input type="email" name="email" placeholder="Email" className={styles.textInput} required />
        </label>

        <label>
          Phone
          <input type="tel" name="phone" placeholder="Phone" className={styles.textInput} />
        </label>

        <label>
          What services are you interested in? *
          <select name="services" className={styles.selectInput} required>
            <option value="">Select...</option>
            <option>VFX/CGI (Music Videos)</option>
            <option>VFX/CGI (Advertisement)</option>
            <option>CGI (FOOH Advertisement)</option>
            <option>Directing (Music Videos, Ads)</option>
          </select>
        </label>

        <label>
          Project Deadline
          <input type="date" name="deadline" className={styles.dateInput} />
        </label>

        <label>
          What is your budget?
          <input type="text" name="budget" placeholder="$" className={styles.textInput} />
        </label>

        <label>
          How did you hear about us?
          <select name="source" className={styles.selectInput}>
            <option value="">Select...</option>
            <option>YouTube/Vimeo</option>
            <option>Instagram</option>
            <option>Recommendation</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          Project Description
          <textarea name="description" rows="5" placeholder="Describe your project..." className={styles.textareaInput}></textarea>
        </label>

        <button type="submit" className={styles.submitBtn}> Submit </button>

      </form>
    </div>
  );
}
