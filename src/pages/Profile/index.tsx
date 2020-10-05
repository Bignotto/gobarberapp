import React from "react";
import { View, Text, Button } from "react-native";

import { useAuth } from "../../hooks/auth";

const Profile: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Profile GoBarber v0</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
};

export default Profile;
