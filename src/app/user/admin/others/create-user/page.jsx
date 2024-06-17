import AdminLinks from "@/components/adminLinks/AdminLinks";
import OtherLinks from "@/components/otherLinks/OtherLinks";
import UserForm from "./userForm/UserForm";
import { url } from "@/utils/api";
const getData = async () => {
  const res = await fetch(`${url}/api/register`);
  return res.json();
};
const CreateUser = async () => {
  const userData = await getData();
  return (
    <div>
      <AdminLinks />
      <OtherLinks />
      <UserForm userInfo={userData} />
    </div>
  );
};

export default CreateUser;
