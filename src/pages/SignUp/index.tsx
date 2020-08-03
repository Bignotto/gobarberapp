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

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  Icon,
} from "./styles";

import { getValidationErrors } from "../../utils/getValidationErrors";
import * as Yup from "yup";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import logoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  // const handleSubmit = useCallback((data: object) => {
  //   console.log(data);
  // }, []);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
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

      // await api.post("/users", data);

      // addToast({
      //   type: "success",
      //   title: "Cadastro realizado!",
      //   description: "Você já pode fazer login!",
      // });

      // history.push("/");
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

      //disparar toast
      // addToast({
      //   type: "error",
      //   title: "Erro no cadastro.",
      //   description: "Verifique seus dados e tente novamente.",
      // });
    }
  }, []);

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
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Password"
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
              Entrar
            </Button>
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
