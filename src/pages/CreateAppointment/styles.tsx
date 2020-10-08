import { Platform } from "react-native";
import Fi from "react-native-vector-icons/Feather";
import { FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Provider } from "./index";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: "RobotoSlab-Medium";
  margin-left: 16px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-size: 20px;
  font-family: "RobotoSlab-Medium";
  line-height: 28px;
`;

export const BackButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;
