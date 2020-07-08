
import React from 'react';
import {
  StyleSheet, Image, PermissionsAndroid,
  Platform, Dimensions, View, Text, Alert,RADIUS,Modal
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };
  }
  componentDidMount() {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
      .then(data => {
        console.log("data response", data);
      }).catch(err => {
      });
    Alert.alert(
      'Alert Title',
      'To continue,turn on current location',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.location() },
      ]
    );
  }
  // componentWillUnmount = () => {
  //   Geolocation.clearWatch(this.watchID);
  // }

  callLocation(that) {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("call location osition", position);
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  location = () => {
    var that = this;
    if (Platform.OS === 'ios') {
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': 'Location Access Required',
            'message': 'This App needs to Access your location'
          }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            that.callLocation(that);
          } else {
            alert("Permission Denied");
          }
        } catch (err) {
          alert("err", err);
          console.warn("erooe", err)
        }
      }
      requestLocationPermission();
    }
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            // region={initialRegion}
            // region={{
            //   longitude: -122.4324,
            //   latitude: 37.78825,
            //   latitudeDelta: 0.015,
            //   longitudeDelta: 0.0121,
            // }}
            region={this.state.region}
            provider={PROVIDER_GOOGLE}
            zoomEnabled={false}
          //strokeWidth={0.1}
          >
            <MapView.Marker
              coordinate={this.state.region}
            />
            <MapView.Circle
        center={{
          latitude:28.6692,
          longitude:77.4538,
        }}
        radius={7000}
        strokeWidth={2}
        strokeColor="blue"
        fillColor="pink"
      />

<MapView.Circle
        center={{
          latitude:28.4089,
          longitude:77.3178,
        }}
        radius={7000}
        strokeWidth={2}
        strokeColor="red"
        fillColor="grey"
      />

<MapView.Circle
        center={{
          latitude:28.9853,
          longitude:77.3936,
        }}
        radius={7000}
        strokeWidth={2}
        strokeColor="green"
        fillColor="yellow"
      />

      <MapView.Circle
        center={{
          latitude:28.1473,
          longitude:77.3260,
        }}
        radius={7000}
        strokeWidth={2}
        strokeColor="blue"
        fillColor="lightgreen"
      />

       <MapView.Circle
        center={{
          latitude:28.9845,
          longitude:77.7064,
        }}
        radius={7000}
        strokeWidth={2}
        strokeColor="blue"
        fillColor="skyblue"
      />
          </MapView>
        </View>

        {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 400 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'blue' }}>
            GET LOCATION
      </Text>
          <Image
            source={require('./ICON/location.png')}
            style={{ width: 70, height: 70 }}
          />
          <Text style={styles.boldText}>
            You are Here
          </Text>
          <Text style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, fontSize: 20, fontWeight: 'bold' }}>
            Longitude: {this.state.region.longitude}
          </Text>
          <Text style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, fontSize: 20, fontWeight: 'bold' }}>
            Latitude: {this.state.region.latitude}
          </Text>
        </View> */}
      </View>

    );
  };
}

const styles = StyleSheet.create({
  boldText: {
    fontSize: 30,
    color: 'red',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 700,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})