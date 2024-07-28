import { MdError } from "react-icons/md";

const ErrorPage = () => {
  return (
    <div style={{ padding: "150px 15px", textAlign: "center" }}>
      <p>
        <MdError style={{ color: "red", marginTop: "10px" }} /> Oops!, Failed to
        load product data
      </p>
    </div>
  );
};

export default ErrorPage;
