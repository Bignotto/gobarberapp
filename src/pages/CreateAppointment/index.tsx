import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, Button, Platform } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import api from "../../services/api";

import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  CalendarTitle,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from "./styles";

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface RouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const { signOut, user } = useAuth();
  const route = useRoute();
  const navigate = useNavigation();
  const routeParams = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>(
    routeParams.providerId
  );

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    api.get("/providers").then(response => {
      setProviders(response.data);
    });
  }, []);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleDateChange = useCallback(() => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigate.goBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Barbeiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => handleSelectProvider(provider.id)}
            selected={provider.id === selectedProvider}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />
            <ProviderName selected={provider.id === selectedProvider}>
              {provider.name}
            </ProviderName>
          </ProviderContainer>
        )}
      />
      <Calendar>
        <CalendarTitle>Escolha a data:</CalendarTitle>
        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={new Date()}
            onChange={handleDateChange}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
