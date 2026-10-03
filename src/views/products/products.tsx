import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const flashMessage = location.state?.flash;

  useEffect(() => {
    if (flashMessage) {
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [flashMessage, navigate, location.pathname]);

  return (
    <>
      {flashMessage && (
        <div role="alert" className="alert alert-success">
          <span>{flashMessage}</span>
        </div>
      )}
    </>
  );
}
