import { useState } from "react";

interface AlertProps {
  text: string;
  type: string;
}
const Alert = ({ text, type }: AlertProps) => {
  const [showAlert, setShowAlert] = useState(true);
  const closeAlert = () => {
    setShowAlert(false);
  };

  if (!showAlert) return null;
  return (
    <div className={"alert-component " + type}>
      <button type="button" className="btn btn-icon" onClick={closeAlert}>
        <i className="icon-clear"></i>
      </button>
      <div className="alert-content">
        <p>{text}</p>
      </div>
    </div>
  );
};
export default Alert;
