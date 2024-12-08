type SortingOptionsProps = {
  onSortingChange: (sortingType: string) => void;
  currentSortingType: string;
}

function SortingOptions({onSortingChange, currentSortingType}: SortingOptionsProps): JSX.Element {
  const sortingTypes = [
    { label: 'Popular', value: 'popular' },
    { label: 'Price: low to high', value: 'lowToHigh' },
    { label: 'Price: high to low', value: 'highToLow' },
    { label: 'Top rated first', value: 'topRatedFirst' },
  ];

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {sortingTypes.find((type) => type.value === currentSortingType)?.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortingTypes.map(({ label, value }) => (
          <li
            key={value}
            className={`places__option ${currentSortingType === value ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => onSortingChange(value)}
          >
            {label}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
