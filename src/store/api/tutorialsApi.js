import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export const tutorialsApi = createApi({
  reducerPath: 'tutorialsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['tutorials'],
  endpoints: (builder) => ({
    getTutorials: builder.query({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(query(collection(db, 'tutorials'), orderBy('id')));
          const tutorials = [];
          querySnapshot?.forEach((doc) => {
            tutorials.push(doc.data());
          });
          return { data: tutorials };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetTutorialsQuery } = tutorialsApi;

export default tutorialsApi;
