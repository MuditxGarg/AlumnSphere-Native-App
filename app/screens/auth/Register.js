import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";

const Register = ({ navigation }) => {
  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);

  // email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // submit button function
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!firstName || !lastName || !email || !password || !location || !profession) {
        Alert.alert("Please Fill All the Details");
        setLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert("Invalid Email Format");
        setLoading(false);
        return;
      }

      setLoading(false);
      const { data } = await axios.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        location,
        profession,
      });

      alert(data && data.message);
      navigation.navigate("Login");
      console.log("Register Data ==> ", { firstName, lastName, email, password, location, profession });

    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox inputTitle={"First Name"} value={firstName} setValue={setFirstName} />
        <InputBox inputTitle={"Last Name"} value={lastName} setValue={setLastName} />
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
        <InputBox
          inputTitle={"Location"}
          value={location}
          setValue={setLocation}
        />
        <InputBox
          inputTitle={"Profession"}
          value={profession}
          setValue={setProfession}
        />
      </View>
      {/* <Text>{JSON.stringify({ firstName, lastName, email, password, location, profession }, null, 4)}</Text> */}
      <SubmitButton
        btnTitle="Register"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Already Registered? Please{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          LOGIN
        </Text>{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85",
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
  },
});

export default Register;
