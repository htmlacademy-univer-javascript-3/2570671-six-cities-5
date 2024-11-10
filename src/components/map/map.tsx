import {City} from '../../types/city.ts';
import {Icon, layerGroup, Marker} from 'leaflet';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const.ts';
import {useEffect, useRef} from 'react';
import useMap from '../../hooks/use-map.tsx';
import {OfferPreview, OfferPreviews} from '../../types/offer-preview.ts';

type MapProps = {
  city: City;
  offers: OfferPreviews;
  selectedOffer: OfferPreview | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map(props: MapProps): JSX.Element {
  const { city, offers, selectedOffer } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map && offers.length > 0) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }).setIcon(
          selectedOffer !== undefined && offer.id === selectedOffer.id
            ? currentCustomIcon
            : defaultCustomIcon
        );
        marker.addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return (
    <div
      className="cities__map map"
      style={{ height: '500px' }}
      ref={mapRef}
      // eslint-disable-next-line react/jsx-closing-tag-location
    ></div>
  );
}

export default Map;
