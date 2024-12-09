import {City} from '../../types/city.ts';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const.ts';
import {memo, useEffect, useRef} from 'react';
import useMap from '../../hooks/use-map.tsx';
import {Offers} from '../../types/offer.ts';
import leaflet from 'leaflet';

type MapProps = {
  city: City;
  offers: Offers;
  activeOfferId: string | null;
  className: string;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({city, offers, activeOfferId, className} : MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          }, {
            icon: offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
          }).addTo(map);

      });

    }
  }, [map, offers, city, activeOfferId]);

  return (
    <div
      className={className}
      ref={mapRef}
    />
  );
}

const MemoizedMap = memo(Map, (prevProps, nextProps) =>
  prevProps.activeOfferId === nextProps.activeOfferId &&
  prevProps.offers.map((offer) => offer.id).join() === nextProps.offers.map((offer) => offer.id).join()
);
export default MemoizedMap;
