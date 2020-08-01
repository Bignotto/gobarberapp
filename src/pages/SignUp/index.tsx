import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from "react-native";

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  Icon,
} from "./styles";

import Button from "../../components/Button";
import Input from "../../components/Input";

import logoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta:</Title>
            </View>
            <Input name="nome" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-Mail" />
            <Input name="password" icon="lock" placeholder="Password" />
            <Button onPress={() => {}}>Entrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" color="#fff" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
