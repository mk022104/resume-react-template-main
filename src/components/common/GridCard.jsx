import {
  GRID_CARD_CONTENT_CLASS_NAME,
  GRID_CARD_WRAPPER_CLASS_NAME,
} from '../../constants';

const GridCard = ({ children, className = '' }) => (
  <div className={GRID_CARD_WRAPPER_CLASS_NAME}>
    <div
      className={`${GRID_CARD_CONTENT_CLASS_NAME} ${className}`}
    >
      {children}
    </div>
  </div>
);

export default GridCard;
