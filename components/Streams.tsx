import React, {useMemo} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {ActivityStreams, Activity as ActivityType} from '../types/strava.types';
import {getDecoratedLaps} from '../utils/getDecoratedLaps';
import {useFetchWithAuth} from '../hooks/useFetchWithAuth';

interface StreamsProps {
  activityId: number;
  laps: ActivityType['laps'];
}

const Streams: React.FC<StreamsProps> = ({activityId, laps}) => {
  const {
    data: streams,
    loading,
    error,
  } = useFetchWithAuth<ActivityStreams | null>(
    `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=cadence,heartrate,altitude,velocity_smooth&key_by_type=true`,
  );

  const lapsDecorated = useMemo(() => {
    if (streams && laps) {
      return getDecoratedLaps(
        laps.map(({start_index, end_index, id, name}) => {
          return {start_index, end_index, id, name};
        }),
        streams,
      );
    } else return [];
  }, [streams, laps, getDecoratedLaps]);

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.item}>
      <Text style={styles.title}>Streams</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={lapsDecorated}
          keyExtractor={lap => lap.id.toString()}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text key={item.id} style={styles.name}>
                {item.name}
              </Text>
              {item.maxCadence && <Text>Max cadence: {item.maxCadence}</Text>}
              {item.maxElevation && (
                <Text>Max elevation: {item.maxElevation} m</Text>
              )}
              {item.minElevation && (
                <Text>Min elevation: {item.minElevation} m</Text>
              )}
              {item.maxHeartRate && (
                <Text>Max heart rate: {item.maxHeartRate}</Text>
              )}
              {item.minHeartRate && (
                <Text>Min heart rate: {item.minHeartRate}</Text>
              )}
              {item.maxSpeed && (
                <Text>Max speed: {item.maxSpeed.toFixed(1)} m/s</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    paddingVertical: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  errorText: {
    color: '#721c24',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Streams;
