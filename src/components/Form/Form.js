import { Component } from 'react';
import PropTypes from 'prop-types';
import '../Form/Form.css';
import shortid from 'shortid';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = shortid.generate();
  numberInputId = shortid.generate();

  handleChange = event => {
    // console.log(event.currentTarget.value);
    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    this.props.onSubmit(this.state); // отправляем значения сабмита в пропс
    this.setState({ name: '', number: '' }); //обнуляем форму
  };

  render() {
    const { name, number } = this.state;
    return (
      <div>
        <form className="form" id="contact" onSubmit={this.handleSubmit}>
          <label className="label" htmlFor={this.nameInputId}>
            Name
            <input
              className="input-field"
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              id={this.nameInputId}
              placeholder="John Dows"
            />
          </label>
          <br />
          <label htmlFor={this.numberInputId}>
            Phone number
            <input
              className="input-field"
              type="text"
              name="number"
              value={number}
              onChange={this.handleChange}
              id={this.numberInputId}
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
}
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Form;
