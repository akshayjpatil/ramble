import * as React from 'react';
import { ContactList } from '../../organisms/ContactList';
import { Contact } from '../../../types/main.types';
import { DefaultLayout } from '../../organisms/DefaultLayout';

export const Home = () => {
	const dummyContacts: Contact[] = [
		{ name: 'Aisha', phone: '981-123-1231', truncatedLastMessage: 'Hi!' },
		{ name: 'Champa', phone: '981-123-1231', truncatedLastMessage: 'Hola!' },
	];
	return (
		<DefaultLayout>
			<ContactList contacts={dummyContacts} />
		</DefaultLayout>
	);
};
