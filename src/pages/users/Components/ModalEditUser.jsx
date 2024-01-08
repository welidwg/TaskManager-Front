import { useEffect, useState } from "react";
import ModalWrapper from "../../../Layouts/Modal";
import { toast } from "react-toastify";
import { URL } from "../../../constants/url";
import { AUTH_TOKEN, Headers } from "../../../constants/constants";
import FormEditUser from "./FormEditUser";

export default function ModalEditUser(props) {
  const [u, setUserData] = useState({
    id: props.user.id,
    username: props.user.username,
    password: props.user.password,
    email: props.user.email,
    avatar: props.user.avatar,
    roles: props.user.roles,
  });

  const handleUpdate = (state) => {
    props.onUpdate(state);
  };

  return (
    <>
      <ModalWrapper id={props.id} title={props.title}>
        <FormEditUser onUpdate={props.onUpdate} user={u} id={props.id} />
      </ModalWrapper>
    </>
  );
}
