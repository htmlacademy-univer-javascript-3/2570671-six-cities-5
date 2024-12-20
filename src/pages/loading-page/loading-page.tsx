import {memo} from 'react';
import './loading-page.css';

function LoadingPage() {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <p className="loading-text">Finding the best places for you...</p>
    </div>
  );
}

const MemoizedLoadingPage = memo(LoadingPage);
export default MemoizedLoadingPage;
