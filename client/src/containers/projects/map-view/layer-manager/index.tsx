import { useEffect, useMemo, useState } from 'react';

import { Source, Layer } from 'react-map-gl';

import bbox from '@turf/bbox';
import { GeoJSONSourceRaw, GeoJSONSourceOptions, CircleLayer, LngLatBoundsLike } from 'mapbox-gl';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useProjects } from '@/hooks/projects';

import { filteredBboxAtom, filtersAtom } from 'store';
import { ActionType, Category, Pathway, Phase, Project } from 'types/project';

const LayerManager = () => {
  const projectsQuery = useProjects();
  const [dataFiltered, setDataFiltered] = useState<Project[]>(projectsQuery.data || []);

  const filters = useRecoilValue(filtersAtom);
  const setFilteredBbox = useSetRecoilState(filteredBboxAtom);

  useEffect(() => {
    const activedFilters = Object.values(filters).some((f) => f.length > 0);
    const dataFinalFiltered = () => {
      const data = projectsQuery.data?.filter((project) => {
        if (filters.pathways.length > 0) {
          if (!filters.pathways.some((pw: Pathway) => project.pathways.includes(pw))) return false;
        }
        if (filters.project_phases.length > 0) {
          if (!filters.project_phases.some((pp: Phase) => project.project_phases.includes(pp)))
            return false;
        }
        if (filters.action_types.length > 0) {
          if (!filters.action_types.some((at: ActionType) => project.action_types.includes(at)))
            return false;
        }
        if (filters.project_categories.length > 0) {
          if (
            !filters.project_categories.some((pc: Category) =>
              project.project_categories.includes(pc)
            )
          )
            return false;
        }
        return true;
      });
      return data;
    };

    if (activedFilters) return setDataFiltered(dataFinalFiltered());

    if (!activedFilters) return setDataFiltered(projectsQuery.data || []);
  }, [filters, projectsQuery.data]);

  const GEOJSON = {
    type: 'FeatureCollection',
    features: dataFiltered.map((project) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [project.centroid_lat, project.centroid_long],
      },
      properties: {
        pathways: project.pathways,
        action_types: project.action_types,
        project_phases: project.project_phases,
        project_categories: project.project_categories,
      },
    })),
  } as GeoJSON.FeatureCollection;

  useEffect(() => {
    const bboxTurf = bbox(GEOJSON) as LngLatBoundsLike;
    setFilteredBbox(bboxTurf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFiltered, setFilteredBbox]);

  const SOURCE: GeoJSONSourceRaw & GeoJSONSourceOptions = {
    type: 'geojson',
    data: GEOJSON,
  };

  const LAYER: CircleLayer = useMemo(() => {
    return {
      id: 'projects-layer',
      type: 'circle',
      // ...(activedFilters && {
      //   filter: [
      //     'all',
      //     ...(!!pathways.length
      //       ? [
      //           [
      //             'any',
      //             ...pathways.map((id) => {
      //               return ['in', id, ['get', 'pathways']];
      //             }),
      //           ],
      //         ]
      //       : []),
      //     ...(!!project_phases.length
      //       ? [
      //           [
      //             'any',
      //             ...project_phases.map((id) => {
      //               return ['in', id, ['get', 'project_phases']];
      //             }),
      //           ],
      //         ]
      //       : []),
      //     ...(!!action_types.length
      //       ? [
      //           [
      //             'any',
      //             ...action_types.map((id) => {
      //               return ['in', id, ['get', 'action_types']];
      //             }),
      //           ],
      //         ]
      //       : []),
      //     ...(!!project_categories.length
      //       ? [
      //           [
      //             'any',
      //             ...project_categories.map((id) => {
      //               return ['in', id, ['get', 'project_categories']];
      //             }),
      //           ],
      //         ]
      //       : []),
      //   ],
      // }),
      paint: {
        'circle-color': '#1F51FF',
        'circle-opacity': 0.5,
        'circle-radius': 10,
      },
      layout: {
        visibility: 'visible',
      },
    };
  }, []);

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} />
    </Source>
  );
};

export default LayerManager;
