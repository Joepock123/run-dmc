import {ActivityStreams, LapsDecorated} from '../types/strava.types';

export const getDecoratedLaps = (
  laps: {start_index: number; end_index: number; id: number; name: string}[],
  streams: ActivityStreams,
): LapsDecorated[] => {
  const decoratedLaps = laps.map(({start_index, end_index, id, name}) => {
    let lap: LapsDecorated = {
      id,
      name,
      start_index,
      end_index,
      maxCadence: null,
      minElevation: null,
      maxElevation: null,
      minHeartRate: null,
      maxHeartRate: null,
      maxSpeed: null,
    };

    const cadence = streams['cadence'];
    if (cadence) {
      const slice = cadence.data.slice(start_index, end_index + 1);
      lap.maxCadence = Math.max(...slice);
    }

    const altitude = streams['altitude'];
    if (altitude) {
      const slice = altitude.data.slice(start_index, end_index + 1);
      lap.minElevation = Math.min(...slice);
      lap.maxElevation = Math.max(...slice);
    }

    const heartrate = streams['heartrate'];
    if (heartrate) {
      const slice = heartrate.data.slice(start_index, end_index + 1);
      lap.minHeartRate = Math.min(...slice);
      lap.maxHeartRate = Math.max(...slice);
    }

    const velocity = streams['velocity_smooth'];
    if (velocity) {
      const slice = velocity.data.slice(start_index, end_index + 1);
      lap.maxSpeed = Math.max(...slice);
    }

    return lap;
  });
  return decoratedLaps;
};
