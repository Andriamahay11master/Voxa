import { Link } from "react-router-dom";

interface ButtonFixedProps {
  path: string;
  classIcon: string;
}
const ButtonFixed = ({ path, classIcon }: ButtonFixedProps) => {
  return (
    <div className="button-fixed">
      <Link to={path} className="btn btn-icon">
        <i className={classIcon}></i>
      </Link>
    </div>
  );
};
export default ButtonFixed;
