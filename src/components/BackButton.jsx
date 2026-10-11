import { useNavigate } from 'react-router-dom';
import './BackButton.css';

/**
 * Returns to the prior in-app screen, or to `fallback` for direct visits
 * and refreshed pages that do not have usable browser history.
 */
export default function BackButton({ fallback = '/dashboard' }) {
  const navigate = useNavigate();

  function goBack() {
    const historyIndex = window.history.state?.idx;
    if (typeof historyIndex === 'number' && historyIndex > 0) {
      navigate(-1);
      return;
    }

    navigate(fallback);
  }

  return (
    <button className="back-button" type="button" onClick={goBack} aria-label="Go back">
      <span aria-hidden="true">←</span>
      Back
    </button>
  );
}
