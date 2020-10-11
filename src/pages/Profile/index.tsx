import React, { useCallback, useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  UserAvatar,
  UserAvatarButton,
  Title,
  BackButton,
} from "./styles";

import Icon from "react-native-vector-icons/Feather";

import api from "../../services/api";

import { getValidationErrors } from "../../utils/getValidationErrors";
import * as Yup from "yup";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import { useAuth } from "../../hooks/auth";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      console.log(data);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatório!"),
          email: Yup.string()
            .required("E-Mail é obrigatório!")
            .email("Informe um e-mail válido."),
          password: Yup.string().min(6, "Senha precisa ter 6 dígitos."),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data);

        Alert.alert("Cadastro Realizado!", "Agora você já pode logar!");

        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          console.log(errors);
          return;
        }

        Alert.alert(
          "Erro no cadastro.",
          "Verifique seu usuário e senha e tente novamente."
        );
      }
    },
    [navigation]
  );

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
            <BackButton onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>
            <View>
              <Title>Meu perfil:</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-Mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={oldPasswordInputRef}
                containerStyle={{ marginTop: 24 }}
                secureTextEntry
                name="old_password"
                icon="lock"
                placeholder="Senha Atual"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  passwordConfirmationInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordConfirmationInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Confirmar mudanças
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
