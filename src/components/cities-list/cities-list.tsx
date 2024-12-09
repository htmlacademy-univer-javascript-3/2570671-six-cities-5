import {useAppDispatch} from '../../hooks';
import {selectCity} from '../../store/action.ts';
import {memo, useCallback} from 'react';

type CitiesListProps = {
  cities: {
    name: string;
    id: number;
  }[];
};

function CitiesList({cities}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityChange = useCallback(
    (city: string) => {
      dispatch(selectCity(city));
    },
    [dispatch]
  );
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={city.id}
          className="locations__item"
          onClick={() => handleCityChange(city.name)}
        >
          <a className="locations__item-link tabs__item" href="#">
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const MemoizedCitiesList = memo(CitiesList);
export default MemoizedCitiesList;
