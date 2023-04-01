import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import PostsScreen from '../nestedScreens/PostsScreen';
import MapScreen from '../nestedScreens/MapScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';

const NestedScreen = createNativeStackNavigator();

export default function Home() {
  return (
    <NestedScreen.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 83,
          paddingHorizontal: 81,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 17,
          fontFamily: 'Roboto-Medium',
          lineHeight: 22,
          color: '#212121',
        },
      }}
    >
      <NestedScreen.Screen
        options={{
          headerTitle: 'Публікації',
          headerRight: () => (
            <Ionicons
              name="log-in-outline"
              size={30}
              color="#BDBDBD"
              style={{ marginRight: 10 }}
            />
          ),
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <NestedScreen.Screen
        options={{
          headerTitle: 'Коментарі',
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <NestedScreen.Screen
        options={{
          headerTitle: 'Мапа',
        }}
        name="MapScreen"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
}
