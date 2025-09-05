import ContactForm from "./ContactForm";
import styles from "./ContactUs.module.css";
import FooterSocial from "../components/FooterContactUs";

export default function ContactUsPage() {
  return (
    <>
    <div className={styles.container}>
      <ContactForm />
      
    </div>
    <FooterSocial />
    </>
  );
}
