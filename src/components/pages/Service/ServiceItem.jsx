import GridCard from '../../common/GridCard';

const ServiceItem = ({ service }) => {
  const { id, icon, title, description } = service;

  return (
    <GridCard className="service-card">
      <span className="service-number" aria-hidden="true">
        {String(id).padStart(2, "0")}
      </span>
      <div className="service-icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="service-title">
        {title}
      </h3>
      <p className="service-description">{description}</p>
    </GridCard>
  );
};

export default ServiceItem;
