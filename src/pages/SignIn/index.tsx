import React from "react";

import { Image } from "react-native";
import { Container, Title, ForgotPassword, ForgotPasswordText } from "./styles";

import Button from "../../components/Button";
import Input from "../../components/Input";

import logoImg from "../../assets/logo.png";

const SignIn: React.FC = () => (
  <Container>
    <Image source={logoImg} />
    <Title>Faça seu logon:</Title>
    <Input name="email" icon="mail" placeholder="E-Mail" />
    <Input name="password" icon="lock" placeholder="Password" />
    <Button onPress={() => {}}>Entrar</Button>

    <ForgotPassword onPress={() => {}}>
      <ForgotPasswordText>Esqueci minha senha...</ForgotPasswordText>
    </ForgotPassword>
  </Container>
);

export default SignIn;
