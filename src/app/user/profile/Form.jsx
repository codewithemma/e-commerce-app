"use client";
import FileBase from "react-file-base64";
import styles from "./Profile.module.css";

// const handleFileDone = (file) => {
//   // setFormData({ ...formData, image: file.base64 });
// };
const Form = () => {
  return (
    <form className={styles.form}>
      <p>Edit your profile</p>
      <div className={styles.form_grid}>
        <div className={styles.input_group}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="fullName"
            // value={session.user.name}
            // onChange={handleChange}
          />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            // value={session?.user?.email}
            readonly
            // onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.form_grid}>
        <div className={styles.input_group}>
          <label htmlFor="name">Address</label>
          <input
            type="text"
            name="fullName"
            // value={session?.user?.address}
            // onChange={handleChange}
          />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="image">Image</label>
          <FileBase
            type="file"
            id="image"
            multiple={false}
            // onDone={handleFileDone}
          />
        </div>
      </div>
      <div className={styles.relative_btn}>
        <div>
          <button>Cancel</button>
          <button>Save Changes</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
