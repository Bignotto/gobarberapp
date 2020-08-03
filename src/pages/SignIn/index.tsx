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
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
  Icon,
} from "./styles";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import logoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";

import * as Yup from "yup";
import { getValidationErrors } from "../../utils/getValidationErrors";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);

  // const handleSubmit = useCallback((data: object) => {
  //   console.log(data);
  // }, []);

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    console.log(data);
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-Mail é obrigatório!")
          .email("Informe um e-mail válido."),
        password: Yup.string().min(6, "Senha precisa ter 6 dígitos."),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // await signIn({ email: data.email, password: data.password });

      // history.push("/dashboard");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
        console.log(errors);
        return;
      }

      // Alert.alert(
      //   "Erro na Autenticação",
      //   "Verifique seu usuário e senha e tente novamente."
      // );
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
              <Title>Faça seu logon:</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-Mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Password"
                secureTextEntry
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
            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha...</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate("SignUp")}>
        <Icon name="log-in" color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
