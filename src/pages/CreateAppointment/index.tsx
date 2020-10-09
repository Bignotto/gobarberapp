import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
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

  useEffect(() => {
    api.get("/providers").then(response => {
      setProviders(response.data);
    });
  }, []);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
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
    </Container>
  );
};

export default CreateAppointment;
