import { useState, useEffect } from "react";

import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formEl = document.querySelector(".form");

    console.log(formEl);

    const formData = new FormData(formEl);

    await fetch("/api/pepe", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((data) => console.log(data));
  };

  const someWork = async () => {
    await addDoc(collection(db, "pepe"), { name: "hola", price: 20 });
  };

  const someWork2 = async () => {
    let pepito = [];
    const q = query(collection(db, "pepe"));

    const querySnapshot = await getDocs(q);

    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      pepito.push({ ...doc.data(), id: doc.id });
    });

    console.log("THIS IS PEPITO");
    console.log(pepito);
  };

  useEffect(() => {
    someWork2();
  }, []);

  return (
    <div className="App">
      <h1>Contact Me form</h1>
      <h2>
        This demonstrates how to send data from a website form to Google sheet
        in React or Vanilla jS
      </h2>
      <div>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <input placeholder="Your Name" name="Name" type="text" />
          <input placeholder="Your Email" name="Email" type="text" />
          <input placeholder="Your Message" name="Message" type="text" />
          <input name="Name" type="submit" />
        </form>
      </div>
    </div>
  );
}
