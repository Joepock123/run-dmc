import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AllActivity} from '../types/strava.types';
import Activity from './Activity';
import {useFetchWithAuth} from '../hooks/useFetchWithAuth';

const Home = () => {
  const [activityId, setActivityId] = useState<null | number>(null);
  const {
    data: activities,
    loading,
    error,
  } = useFetchWithAuth<AllActivity[]>(
    'https://www.strava.com/api/v3/athlete/activities?per_page=100',
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
      {activityId ? (
        <Activity
          activityId={activityId}
          onPrevious={() => setActivityId(null)}
        />
      ) : (
        <>
          <Text style={styles.title}>Activities</Text>
          <FlatList
            data={activities}
            keyExtractor={activity => activity.id.toString()}
            renderItem={({item}) => (
              <View style={styles.item}>
                <TouchableOpacity onPress={() => setActivityId(item.id)}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text>Athlete ID: {item.athlete.id}</Text>
                  <Text>Type: {item.type}</Text>
                  <Text>Moving Time: {item.moving_time} seconds</Text>
                  <Text>Distance: {(item.distance / 1000).toFixed(2)} km</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
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
    marginTop: 50,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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

export default Home;
