import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.container}>
      <main className={styles.row}>
        <section className={`${styles.col} ${styles.left}`}>
          <div className={styles.contactTitle}>
            <h2>Contact us For any Query</h2>
            <p>
              "Your feedback fuels our growth, your questions inspire our
              innovation, and your contact ignites our connection. Let's build
              something extraordinary together."
            </p>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.iconGroup}>
              <div className={styles.icon}>
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className={styles.details}>
                <span>Mobile No</span>
                <span>+91 8922892176 </span>
              </div>
            </div>

            <div className={styles.iconGroup}>
              <div className={styles.icon}>
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className={styles.details}>
                <span>Email</span>
                <span>gopaldixit011@gmail.com</span>
              </div>
            </div>

            <div className={styles.iconGroup}>
              <div className={styles.icon}>
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className={styles.details}>
                <span>Location</span>
                <span>Remote</span>
              </div>
            </div>
          </div>

          <div className={styles.socialMedia}>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </section>

        <section className={`${styles.col} ${styles.right}`}>
          <form className={styles.messageForm}>
            <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
              <input type="text" name="" required="required" />
              <label>Your Name</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.halfWidth}`}>
              <input type="email" name="" required="required" />
              <label>Email</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <input type="text" name="" required="required" />
              <label>Subject</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <textarea required="required"></textarea>
              <label>Say Something</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <button
                onClick={() =>
                  alert("The Information successfully send to your email ")
                }
              >
                Send Message
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Contact;
