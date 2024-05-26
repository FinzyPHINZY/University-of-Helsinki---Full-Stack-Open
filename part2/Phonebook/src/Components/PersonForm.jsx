import React from "react";

const PersonForm = ({
  formHandler,
  name,
  number,
  nameHandler,
  numberHandler,
}) => {
  return (
    <div>
      <form onSubmit={formHandler}>
        <div>
          name: <input value={name} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={number} onChange={numberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
