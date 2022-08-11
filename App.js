import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
// import uploadToAnonymousFilesAsync from "anonymous-files";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access media library was denied");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    //not working anymore
    // if (Platform.OS === "web") {
    //   const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
    //   setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    // }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const openShareDialogAsync = async () => {
    const permissionResult = await Sharing.isAvailableAsync();
    if (!permissionResult) {
      alert("Share is not available in your device");
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selector de Imagenes</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          style={styles.image}
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localUri
                : "https://random-memer.herokuapp.com/",
          }}
        />
      </TouchableOpacity>
      {selectedImage !== null ? (
        <View>
          <Button title="Compartir" onPress={openShareDialogAsync} />
        </View>
      ) : (
        <></>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 30,
    margin: 20,
  },
});
