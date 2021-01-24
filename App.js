/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {Icon} from 'native-base';

import Shopping_Main from './src/components/Shopping_Main';
import Inventory_Main from './src/components/Inventory_Main';

import store from './configureStore';

const Tab = createBottomTabNavigator();
const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Shopping List"
              component={Shopping_Main}
              options={{
                tabBarIcon: () => (
                  <Icon type="MaterialIcons" name="shopping-cart" />
                ),
              }}
            />
            <Tab.Screen
              name="Inventory"
              component={Inventory_Main}
              options={{
                tabBarIcon: () => <Icon type="MaterialIcons" name="store" />,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
