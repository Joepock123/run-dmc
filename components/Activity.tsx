import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import BackButton from './BackButton';
import {Activity as ActivityType} from '../types/strava.types';
import Streams from './Streams';
import {useFetchWithAuth} from '../hooks/useFetchWithAuth';

interface ActivityProps {
  activityId: number;
  onPrevious: () => void;
}

const Activity: React.FC<ActivityProps> = ({activityId, onPrevious}) => {
  const {
    data: activity,
    loading,
    error,
  } = useFetchWithAuth<ActivityType | null>(
    `https://www.strava.com/api/v3/activities/${activityId}`,
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton previous="Home" onPress={onPrevious} />

      {activity ? (
        <>
          <View style={styles.container}>
            <Text style={styles.title}>{activity.name}</Text>
            <Text>Athlete ID: {activity.athlete.id}</Text>
            <Text>Type: {activity.type}</Text>
            <Text>Moving Time: {activity.moving_time} seconds</Text>
            <Text>Distance: {(activity.distance / 1000).toFixed(2)} km</Text>
            <Text>Calories: {activity.calories}</Text>
          </View>
          <View style={styles.listContainer}>
            <Streams activityId={activityId} laps={activity.laps} />
          </View>
        </>
      ) : (
        <View style={styles.item}>
          <Text style={styles.name}>No data for activity.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    padding: 15,
  },
  item: {
    paddingVertical: 15,
    flex: 1,
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

export default Activity;
