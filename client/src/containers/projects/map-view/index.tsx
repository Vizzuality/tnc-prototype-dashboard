'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMap, Popup } from 'react-map-gl';

import { useRouter } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';
import { MapboxProps } from 'react-map-gl/dist/esm/mapbox/mapbox';
import { useRecoilValue } from 'recoil';

import { useTotalData } from '@/hooks/projects';

import Map from 'components/map';
import { WORLD_BOUNDS } from 'components/map/constants';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';
import Select from 'components/ui/select';
import Card from 'containers/projects/card';
import { SORT_OPTIONS } from 'containers/projects/map-view/constants';
import LayerManager from 'containers/projects/map-view/layer-manager';
import Tabs from 'containers/projects/map-view/tabs';
import { basemapAtom, filteredBboxAtom } from 'store';
import { Project, PopUp } from 'types/project';
import BASEMAPS from 'utils/basemaps';
import { cn } from 'utils/cn';

const initialViewState: MapboxProps['initialViewState'] = {
  bounds: WORLD_BOUNDS,
  fitBoundsOptions: {
    padding: 50,
  },
};

const DEFAULT_PROPS = {
  initialViewState: {
    longitude: 0,
    latitude: 20,
    zoom: 2,
    pitch: 0,
    bearing: 0,
  },
  minZoom: 1,
  maxZoom: 20,
};

const MapView = ({ data }: { data: Project[] }): JSX.Element => {
  const totalDataQuery = useTotalData();
  const { push } = useRouter();

  const mapRef = useRef(null);
  const [sortedBy, setSortedBy] = useState<string>('country');
  const [projectsPopUp, setProjectsPopUp] = useState<PopUp>({
    popup: [],
    popupInfo: null,
    popUpPosition: {
      x: null,
      y: null,
    },
  });

  const filteredBbox = useRecoilValue(filteredBboxAtom);
  const basemap = useRecoilValue(basemapAtom);

  const { ['projects-map']: map } = useMap();

  const selectedBasemap = useMemo(() => BASEMAPS.find((b) => b.id === basemap).url, [basemap]);

  const { minZoom, maxZoom } = DEFAULT_PROPS;

  // This effect will update bounds when filtering projectss
  useEffect(() => {
    if (map) {
      map.fitBounds(filteredBbox, { padding: 50 });
    }
  }, [filteredBbox, map]);

  // const handleViewState = useCallback(() => {
  //   if (map) {
  //     console.log('map', map.getStyle().layers);
  //   }
  // }, [map]);

  const bounds: CustomMapProps['bounds'] = {
    bbox: [-237.65625, -78.836065, 238.007813, 78.767792],
    options: {
      padding: {
        top: 50,
        right: 20,
        bottom: 50,
        left: 640,
      },
    },
  };

  const removePopup = () => {
    setProjectsPopUp({
      popup: [],
      popupInfo: null,
      popUpPosition: {
        x: null,
        y: null,
      },
    });
  };

  const onMouseEnterHandler = (e: Parameters<CustomMapProps['onMouseEnter']>[0]) => {
    const projectsFeature = e?.features?.find(({ layer }) => layer.id === 'projects-layer');

    if (projectsFeature) {
      setProjectsPopUp({
        ...projectsPopUp,
        popup: [e?.lngLat.lat, e?.lngLat.lng],
        popupInfo: projectsFeature.properties as PopUp['popupInfo'],
        popUpPosition: {
          x: e.point.x,
          y: e.point.y,
        },
      });

      if (!projectsFeature) {
        removePopup();
      }
    }
  };

  const onMouseLeaveHandler = () => {
    removePopup();
  };

  const onClickHandler = (e: Parameters<CustomMapProps['onClick']>[0]) => {
    const projectsFeature = e?.features?.find(({ layer }) => layer.id === 'projects-layer');
    if (projectsFeature) {
      push(`/projects/${projectsPopUp.popupInfo.id}`);
    }
  };

  const getSortedData = (arr: Project[], sortedBy: string) => {
    if (!sortedBy) return arr;

    const sortedArr = [...arr].sort((a, b) => (a[sortedBy] < b[sortedBy] ? -1 : 1));

    return sortedArr;
  };

  const sortedData = getSortedData(data, sortedBy);

  return (
    <AnimatePresence>
      <motion.div
        className="z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
      >
        {!sortedData.length && (
          <div className="flex h-64 w-full items-center justify-center">
            <p className="font-serif text-lg font-semibold text-indigo">No projects found</p>
          </div>
        )}
        {!!sortedData.length && (
          <div className="flex space-x-6">
            <div className="no-scrollbar max-h-[80vh] w-6/12 overflow-hidden overflow-x-hidden overflow-y-scroll">
              <section className="bg-background">
                <div className="mx-20 flex justify-between py-7">
                  <div className="flex flex-col items-center space-y-2">
                    <p className="font-sans text-4xl font-bold text-spring">
                      {totalDataQuery.data?.total_people_supported}
                    </p>
                    <p className="max-w-[160px] text-center text-base font-medium leading-5 text-text">
                      People Supported
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <p className="font-sans text-4xl font-bold text-spring">
                      {totalDataQuery.data?.total_area_ha_impacted}
                    </p>
                    <p className="max-w-[160px] text-center text-base font-medium leading-5 text-text">
                      Hectares Impacted
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <p className="font-sans text-4xl font-bold text-spring">
                      {totalDataQuery.data?.total_carbon_mitigation}
                    </p>
                    <p className="max-w-[160px] text-center text-base font-medium leading-5 text-text">
                      Million Tons of Carbon Sequestered
                    </p>
                  </div>
                </div>
              </section>
              <div className="flex items-center justify-end space-x-6">
                <p className="font-sans text-xs text-text">SORT BY:</p>
                <div className="mb-1">
                  <Select
                    theme="secondary"
                    type="Country"
                    onValueChange={(v) => setSortedBy(v)}
                    options={SORT_OPTIONS}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {sortedData.map((project) => (
                  <div key={project.id}>
                    <Card data={project} />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[80vh] w-6/12" ref={mapRef}>
              <div className="absolute top-3 right-14 z-10">
                <Tabs />
              </div>
              <Map
                id="projects-map"
                mapStyle={selectedBasemap}
                minZoom={minZoom}
                maxZoom={maxZoom}
                initialViewState={initialViewState}
                interactiveLayerIds={['projects-layer']}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                // onMapViewStateChange={handleViewState}
                bounds={bounds}
                onClick={onClickHandler}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
                preserveDrawingBuffer
              >
                {() => (
                  <>
                    <LayerManager />

                    <Controls
                      className={cn({
                        'absolute top-3 right-3 items-center rounded-none print:hidden': true,
                      })}
                    >
                      <div className="flex flex-col space-y-2">
                        <ZoomControl mapId="projects-map" />
                      </div>
                    </Controls>
                    {!!projectsPopUp?.popup?.length && (
                      <Popup longitude={projectsPopUp.popup[1]} latitude={projectsPopUp.popup[0]}>
                        <div className="px-2 py-1">
                          <p className="font-sans text-2xs text-gray-800">
                            {projectsPopUp.popupInfo.name}
                          </p>
                        </div>
                      </Popup>
                    )}
                  </>
                )}
              </Map>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MapView;
