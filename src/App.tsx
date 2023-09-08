import * as React from 'react';
import { Admin, Resource, ListGuesser, defaultTheme } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import Layout from './Layout';
import contacts from './contacts';
import companies from './companies';
import deals from './deals';
import { Dashboard } from './dashboard/Dashboard';
import db from './dataGenerator'
import localStorageDataProvider from "ra-data-local-storage";


const getDefaultData = () => {
  return db();
};
const getDataProviderWithDefaults = () => {
  const defaultData = getDefaultData();
  console.log(defaultData);

  return localStorageDataProvider({ defaultData });
};

const App = () => (
    <Admin
        dataProvider={getDataProviderWithDefaults()}
        authProvider={authProvider}
        layout={Layout}
        dashboard={Dashboard}
        theme={{
            ...defaultTheme,
            palette: {
                mode: 'light',
                primary: {
                  main: '#3f51b5',
                },
                secondary: {
                  main: '#948b8e',
                },
              },
        }}
    >
        <Resource name="deals" {...deals} />
        <Resource name="contacts" {...contacts} />
        <Resource name="companies" {...companies} />
        <Resource name="contactNotes" />
        <Resource name="dealNotes" />
        <Resource name="tasks" list={ListGuesser} />
        <Resource name="sales" list={ListGuesser} />
        <Resource name="tags" list={ListGuesser} />
    </Admin>
);

export default App;
