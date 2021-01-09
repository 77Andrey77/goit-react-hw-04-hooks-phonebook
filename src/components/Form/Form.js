import { useState } from 'react';
import PropTypes from 'prop-types';
import '../Form/Form.css';
// import shortid from 'shortid';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // state = {
  //   name: '',
  //   number: '',
  // };

  // const nameInputId = shortid.generate();
  // const numberInputId = shortid.generate();

  const handleChange = event => {
    // console.log(event.currentTarget.value);
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    onSubmit(name, number); // отправляем значения сабмита в пропс
    setName(''); //обнуляем форму
    setNumber('');
  };

  // const { name, number } = this.state;
  return (
    <div>
      <form className="form" id="contact" onSubmit={handleSubmit}>
        <label className="label">
          Name
          <input
            className="input-field"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            // id={nameInputId}
            placeholder="John Dows"
          />
        </label>
        <br />
        <label>
          Phone number
          <input
            className="input-field"
            type="text"
            name="number"
            value={number}
            onChange={handleChange}
            // id={numberInputId}
            placeholder="459-12-56"
          />
        </label>

        <button type="submit" className="submit-button">
          Add contact
        </button>
      </form>
    </div>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
