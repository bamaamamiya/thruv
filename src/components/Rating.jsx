import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
const Rating = ({ rating, terjual }) => {
  return (
    <div>
      <div className="grid text-yellto text-2xl text-center">
        <div className="flex justify-center items-center ">
          <FontAwesomeIcon icon={faStar} size="2x" />
          <FontAwesomeIcon icon={faStar} size="2x" />
          <FontAwesomeIcon icon={faStar} size="2x" />
          <FontAwesomeIcon icon={faStar} size="2x" />
          <FontAwesomeIcon icon={faStarHalfStroke} size="2x" />
        </div>
        <br />
        <div className="text-black font-bold text-center">
          <p>{rating}</p>
          <p>{terjual}</p>
        </div>
      </div>
    </div>
  );
};

export default Rating;
