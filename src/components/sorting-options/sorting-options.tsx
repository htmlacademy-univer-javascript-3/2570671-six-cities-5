import {SortingType} from '../../types/sorting-type.ts';
import {memo, useState} from 'react';

type SortOptionsProps = {
  sortType: SortingType;
  handleSortingChoose: (sortType: SortingType) => void;
}

function SortingOptions({ sortType, handleSortingChoose }: SortOptionsProps) {
  const [isOpened, setIsOpened] = useState<boolean>();

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={() => setIsOpened(!isOpened)}
        className="places__sorting-type"
        tabIndex={0}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}>
        {
          Object.values(SortingType)
            .map((item) => (
              <li
                onClick={() => {
                  setIsOpened(false);
                  handleSortingChoose(item);
                }}
                key={item}
                className={`places__option ${item === sortType && 'places__option--active'}`}
                tabIndex={0}
              >{item}
              </li>)
            )
        }
      </ul>
    </form>
  );
}

const MemoizedSortingOptions = memo(SortingOptions);
export default MemoizedSortingOptions;
