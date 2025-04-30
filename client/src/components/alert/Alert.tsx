interface AlertProps {
  text: string;
  type: string;
}
const Alert = ({ text, type }: AlertProps) => {
  return (
    <div className={"alert-component " + type}>
      <button type="button" className="btn btn-icon">
        <i className="icon-close"></i>
      </button>
      <div className="alert-content">
        <p>{text}</p>
      </div>
    </div>
  );
};
export default Alert;
