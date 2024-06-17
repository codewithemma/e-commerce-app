import AdminLinks from "@/components/adminLinks/AdminLinks";
import OtherLinks from "@/components/otherLinks/OtherLinks";
import UserForm from "./userForm/UserForm";
import { url } from "@/utils/api";
// const getData = async () => {
//   try {
//     const res = await fetch(`${url}/api/register`);
//     return res.json();
//   } catch (error) {
//     const errorMessage = await res.json();
//     console.log(errorMessage.message);
//   }
// };
const CreateUser = async () => {
  // const userData = await getData();
  // console.log(userData);
  return (
    <div>
      <AdminLinks />
      <OtherLinks />
      <UserForm />
    </div>
  );
};

export default CreateUser;
// userInfo={userData}
