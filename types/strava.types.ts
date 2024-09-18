import allActivity from './allActivity.json';
import activity from './activity.json';
import activityStreams from './activityStreams.json';

export type AllActivity = (typeof allActivity)[0];
export type Activity = typeof activity;
export type ActivityStreams = typeof activityStreams;

export type LapsDecorated = {
  id: number;
  name: string;
  start_index: number;
  end_index: number;
  maxCadence: number | null;
  maxElevation: number | null;
  minElevation: number | null;
  maxHeartRate: number | null;
  minHeartRate: number | null;
  maxSpeed: number | null;
};
