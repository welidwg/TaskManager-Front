import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../constants/url";
import Wrapper from "../Layouts/Wrapper";
import { Headers } from "../constants/constants";

export default function Home(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${URL}/account/getAll`, Headers)
      .then((res) => {
        setProducts(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Wrapper>
      <h3 className="text-dark mb-1">Dashboard</h3>
    </Wrapper>
  );
}
