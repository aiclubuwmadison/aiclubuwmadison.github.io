import Subheader from '../typographic/Subheader';
import BodyText from '../typographic/BodyText';

const Portrait = ({ file, link, name, title }) => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <a className="card-image" href={link} target="_blank" rel="noreferrer">
          <img
            src={`/images/portraits/${file}`}
            width={300}
            height={300}
            alt={name}
          />
        </a>
        <a className="card-description" href={link} target="_blank" rel="noreferrer">
          <Subheader>{name}</Subheader>
          <BodyText>{title}</BodyText>
        </a>
      </div>
    </div>
  );
};

export default Portrait;
