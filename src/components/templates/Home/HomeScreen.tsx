import * as React from 'react';
import { dummyContacts } from '../../../../mocks/contacts';
import { ContactList } from '../../organisms/ContactList';
import { DefaultLayout } from '../../organisms/DefaultLayout';

export const Home = () => {
	return (
		<DefaultLayout title='Messages'>
			<ContactList contacts={dummyContacts} />
		</DefaultLayout>
	);
};
