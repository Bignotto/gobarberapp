import styled from "styled-components/native";
import { Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;

  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 150 : 50}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: "RobotoSlab-Medium";

  margin: 20px 0;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 180px;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  align-self: center;
`;
