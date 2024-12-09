import {memo} from 'react';

function LoadingPage() {
  return (
    <div style={
      {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }
    }
    >
      <div>
        <h1>Loading</h1>
      </div>
    </div>
  );
}
const MemoizedLoadingPage = memo(LoadingPage);
export default MemoizedLoadingPage;
