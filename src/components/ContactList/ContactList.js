import PropTypes from 'prop-types';
import '../ContactList/ContactList.css';

function ContactList({ contacts, onDeleteContact }) {
    return (
        <ul>
            {contacts.map(({ id, name, number }) => (
                <li className="contactItem" key={id}>
                    <p className="item">
                        {name} : {number}
                    </p>
                    <button
                        className="button"
                        type="button"
                        onClick={() => onDeleteContact(id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}
ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};
export default ContactList;
