import React from "react";

const Finall = ({ values }) => {

    //destructuring the object from values
  const { firstName, lastName, age, email } = values;
  return (
    <>
          <p>
            <strong>First Name :</strong> {username}{" "}
          </p>
          <p>
            <strong>Last Name :</strong> {lastName}{" "}
          </p>
          <p>
            <strong>Age :</strong> {age}{" "}
          </p>
          <p>
            <strong>Email :</strong> {email}{" "}
          </p>
    </>
  );
};

export default Finall;
