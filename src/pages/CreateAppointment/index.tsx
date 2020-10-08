import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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

  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api.get("/providers").then(response => {
      setProviders(response.data);
    });
  });

  const routeParams = route.params as RouteParams;
  return (
    <>
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
            <HeaderTitle>{provider.name}</HeaderTitle>
          )}
        />
      </Container>

      <View>
        <Text>Clicou no {routeParams.providerId}</Text>
        <Button title="Sair" onPress={signOut} />
      </View>
    </>
  );
};

export default CreateAppointment;
