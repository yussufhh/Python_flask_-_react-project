// CounterCard.js
import PropTypes from 'prop-types';

const CounterCard = ({ value, label, bgColor }) => (
  <div className={`${bgColor} p-4 rounded-lg text-center text-white`}>
    <h2 className="text-2xl font-bold">{value}+</h2>
    <p className="text-gray-200">{label}</p>
  </div>
);

CounterCard.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
};

CounterCard.defaultProps = {
  bgColor: 'bg-blue-500',
};

export default CounterCard;
