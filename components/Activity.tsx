import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {fetchHelper} from '../utils/fetchHelper';
import {useAuth} from '../providers/AuthContext';
import {getFetchOptions} from '../utils/getFetchOptions';
import BackButton from './BackButton';
import {Activity as ActivityType} from '../types/strava.types';

interface ActivityProps {
  activityId: number;
  onPrevious: () => void;
}

const Activity: React.FC<ActivityProps> = ({activityId, onPrevious}) => {
  const {authResult} = useAuth();
  const [activity, setActivity] = useState<ActivityType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetchHelper(
      `https://www.strava.com/api/v3/activities/${activityId}`,
      getFetchOptions(authResult?.accessToken),
      setLoading,
      setActivity,
      setError,
    );
  }, [authResult?.accessToken, activityId, setLoading, setActivity, setError]);

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
        <View style={styles.item}>
          <Text style={styles.title}>{activity.name}</Text>
          <Text>Athlete ID: {activity.athlete.id}</Text>
          <Text>Type: {activity.type}</Text>
          <Text>Moving Time: {activity.moving_time} seconds</Text>
          <Text>Distance: {(activity.distance / 1000).toFixed(2)} km</Text>
          <Text>Calories: {activity.calories}</Text>
        </View>
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
    padding: 20,
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

export default Activity;
