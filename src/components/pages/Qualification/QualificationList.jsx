import GridCard from '../../common/GridCard';

const QualificationList = ({ qualification, desc }) => {
  const { title, link, description, image } = qualification || desc;

  return (
    <GridCard className="qualification-card">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit ${title} institution website`}
        className="qualification-image-link"
      >
        <div className="qualification-image-wrap relative mb-6 h-48 w-full overflow-hidden rounded-md">
          <img
            src={image}
            alt={`${title} institution`}
            className="qualification-image h-full w-full object-cover object-center"
          />
          <div className="qualification-overlay absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <span className="qualification-link flex h-10 items-center justify-center rounded-full border border-white/80 px-5 text-sm font-semibold text-white">
              Visit institution
            </span>
          </div>
        </div>
      </a>
      <h3 className="qualification-title mb-2 text-lg font-semibold text-gray-800">
        {title}
      </h3>
      <p className="qualification-description text-gray-900">{description}</p>
    </GridCard>
  );
};

export default QualificationList;
