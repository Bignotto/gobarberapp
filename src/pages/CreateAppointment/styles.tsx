import { Platform } from "react-native";
import Fi from "react-native-vector-icons/Feather";
import { FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Provider } from "./index";

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

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
  padding: 16px 24px 16px;
  max-height: 100px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background: ${props => (props.selected ? "#ff9000" : "#3e3b47")};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  color: ${props => (props.selected ? "#232129" : "#f4ede8")};
  font-size: 16px;
  font-family: "RobotoSlab-Medium";
  margin-left: 8px;
`;

export const Calendar = styled.View`
  flex: 1;
`;

export const CalendarTitle = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  font-family: "RobotoSlab-Medium";
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-size: 16px;
  font-family: "RobotoSlab-Medium";
  margin-left: 8px;
  color: #232129;
`;
