import {useSelector} from 'react-redux';
import {AppState} from '../../store/reducer.ts';
import {memo} from 'react';

function MainEmptyPage(): JSX.Element{
  const chosenCity = useSelector<AppState, string>((state) => state.chosenCity);
  return(
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">{`We could not find any property available at the moment in ${chosenCity}`}</p>
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map"></section>
      </div>
    </div>
  );
}

const MemoizedMainEmptyPage = memo(MainEmptyPage);
export default MemoizedMainEmptyPage;
