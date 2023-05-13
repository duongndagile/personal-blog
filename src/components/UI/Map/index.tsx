import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";
import styles from "./index.module.scss";
import { ENV } from "../../../constant/env";

function circlePath(center: any, radius: number, points: number) {
  console.log(google.maps.geometry);
  var a = [],
    p = 360 / points,
    d = 0;
  for (var i = 0; i < points; ++i, d += p) {
    a.push(google.maps.geometry.spherical.computeOffset(center, radius, d));
  }
  return a;
}

const MapComponent = () => {
  useEffect(() => {
    if (!!document) {
      (async () => {
        const loader = new Loader({
          apiKey: ENV.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
          version: "weekly",
          libraries: ["places", "geometry"],
        });

        const mapOptions = {
          center: {
            lat: 21.0034109,
            lng: 105.8044407,
          },
          zoom: 13,
        };

        // Promise
        const google = await loader.load();
        const map = new google.maps.Map(
          document.getElementById("map")!,
          mapOptions
        );

        const myLatLng = { lat: 21.0034109, lng: 105.8044407 };

        const marker = new google.maps.Marker({
          position: myLatLng,
          map,
          title: "Click to zoom XXX",
        });

        const circle = new google.maps.Polygon({
          map,
          paths: circlePath(map.getCenter(), 5000, 360),
        });

        map.addListener("click", ({ latLng: { lat, lng } }: any) => {
          const position = {
            lat: lat(),
            lng: lng(),
          };
          marker.setPosition(position);

          window.setTimeout(() => {
            map.panTo(marker.getPosition() as google.maps.LatLng);
            circle.setPaths(circlePath(map.getCenter(), 5000, 360));
          }, 300);
        });
      })();
    }
  }, []);

  return (
    <>
      <div id="map" className={styles.map}></div>
    </>
  );
};

export default MapComponent;
