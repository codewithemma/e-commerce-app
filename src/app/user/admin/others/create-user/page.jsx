import AdminLinks from "@/components/adminLinks/AdminLinks";
import OtherLinks from "@/components/otherLinks/OtherLinks";
import UserForm from "./userForm/UserForm";
import { url } from "@/utils/api";
const getData = async () => {
  try {
    const res = await fetch(`${url}/api/admin/register`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    const errorMessage = await res.json();
    console.log(errorMessage.message);
  }
};
const CreateUser = async () => {
  const data = await getData();
  console.log(data);
  return (
    <div>
      <AdminLinks />
      <OtherLinks />
      <UserForm userInfo={data} />
    </div>
  );
};

export default CreateUser;
