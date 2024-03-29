import { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  ImageBackground,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../constants';
import { ScreenHeaderBtn, Signin, Signup, Welcome } from '../components';
import welcomePageBackground from '../assets/images/ready-up-home-page-wallpaper.png';

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerShown: false,
          // headerLeft: () => (
          //   <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          // ),
          // headerRight: () => (
          //   <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          // ),
          headerTitle: '',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={welcomePageBackground}
          resizeMode='cover'
          style={{ height: '100vh', width: '100vw' }}
        >
          <View style={{ flex: 1, padding: SIZES.medium }}>
            <Welcome />
            <Signin />
            {/* <Signup /> */}
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
