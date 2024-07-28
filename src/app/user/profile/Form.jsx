"use client";
import FileBase from "react-file-base64";
import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import Loader from "@/components/loader/Loader";
import { toast } from "sonner";

const Form = ({ session }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    image: "",
    address: "",
  });

  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (session) {
      setFormData({
        fullName: session.fullName || "",
        image: "",
        address: session?.address || "",
      });
    }
  }, [session]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileDone = (file) => {
    if (file.type.includes("image")) {
      setFormData({ ...formData, image: file.base64 });
    } else {
      toast.error("Please select an image file.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setPending(true);
      const res = await fetch(`/api/user/register/${session._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setPending(false);
        toast.success(`User updated successfully`);
      } else {
        setPending(false);
        toast.error("User update failed");
      }
    } catch (error) {
      setPending(false);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.form}>
      <p>Edit your profile</p>
      <div className={styles.form_grid}>
        <div className={styles.input_group}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={session.email} readonly />
        </div>
      </div>
      <div className={styles.form_grid}>
        <div className={styles.input_group}>
          <label htmlFor="name">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="image">Image</label>
          <FileBase
            type="file"
            id="image"
            multiple={false}
            onDone={handleFileDone}
          />
        </div>
      </div>
      <div className={styles.relative_btn}>
        <div>
          <button>Cancel</button>
          <button onClick={handleSubmit} disabled={pending}>
            {pending ? (
              <span>
                Save Changes <Loader />
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
