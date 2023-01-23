import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {
  RequestCameraPermission,
  Assessment,
} from '@xtravision/xtravision-react-native';
import {CameraPermissionStatus} from '@xtravision/xtravision-react-native';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const status = await RequestCameraPermission();
      setHasPermission(status === CameraPermissionStatus.AUTHORIZED);
    })();
  }, []);

  const [inPose, setInPose] = React.useState(false);
  const [repsCounter, setRepsCounter] = React.useState(0);
  // required prop:
  function onServerResponse(serverResponse) {
    if (serverResponse.errors.length) {
      console.error('Server Error Response:', serverResponse.errors);
      return;
    }

    console.log('Server Data:', serverResponse.data);

    // // TODO: put proper handling as per assessment
    // setRepsCounter(serverResponse.data?.additional_response?.reps.total);
    // setInPose(serverResponse.data?.additional_response?.in_pose);
  }

  // eslint-disable-next-line prettier/prettier
  const authToken = "__MY-PRIVATE-TOKEN__"; // IMP: user-specific token
  const assessmentName = 'PUSH_UPS';
  const cameraPosition = 'front';

  const connectionData = {
    assessment_name: assessmentName,
    auth_token: authToken,
    assessment_config: {}, // check document for more details
    user_config: {}, // check document for more details
  };

  const requestData = {
    isPreJoin: false,
  };

  const libData = {
    onServerResponse,
    cameraPosition,
  };

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <>
          {/* <Text>App has Permission</Text> */}
          <Assessment
            connectionData={connectionData}
            requestData={requestData}
            libData={libData}
          />

          {/* <Text>
            In-Pose: {inPose} ; Reps Counter: {repsCounter}
          </Text> */}
        </>
      ) : (
        <>
          <Text>App don't have Permission</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});
