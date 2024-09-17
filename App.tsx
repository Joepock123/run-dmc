/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {AuthConfiguration, authorize} from 'react-native-app-auth';
import DeviceInfo from 'react-native-device-info';
import {useAuth} from './providers/AuthContext';
import Home from './components/Home';

const STRAVA_URL = 'https://www.strava.com';
const STRAVA_CLIENT_ID = '134973';
const STRAVA_CLIENT_SECRET = '0238dae4d59f561922e028393915785adcbb0c67';
// const STRAVA_CLIENT_ID = '89250';
// const STRAVA_CLIENT_SECRET = '5e8e8b10a5675c6ef110dd589436e708520be4d4';

export const STRAVA_CONFIG: AuthConfiguration = {
  issuer: STRAVA_URL,
  clientId: STRAVA_CLIENT_ID,
  clientSecret: STRAVA_CLIENT_SECRET,
  redirectUrl: `${DeviceInfo.getBundleId()}://oauth`,
  scopes: ['activity:read_all,activity:write'],
  serviceConfiguration: {
    authorizationEndpoint: `${STRAVA_URL}/oauth/mobile/authorize`,
    tokenEndpoint: `${STRAVA_URL}/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}`,
  },
};

const App = () => {
  const {authResult, setAuthResult} = useAuth();
  console.log('\n');
  console.log(`${DeviceInfo.getBundleId()}://oauth`);
  console.log('\n');
  const onPressStravaAuth = useCallback(async () => {
    const result = await authorize(STRAVA_CONFIG);
    console.log(result, 'Strava oauth response');
    setAuthResult(result);
  }, [setAuthResult]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{padding: 16, flex: 1}}
      contentContainerStyle={{flex: 1}}>
      {authResult?.accessToken ? (
        <Home />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={onPressStravaAuth}
            style={{
              backgroundColor: '#161616',
              borderRadius: 4,
              padding: 16,
            }}>
            <Text style={{color: '#FFF'}}>Strava Auth</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default App;
