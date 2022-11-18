import * as React from 'react';
import { Contact } from '../../../types/contact.type';
import { ContactList } from '../../organisms/ContactList';
import { DefaultLayout } from '../../organisms/DefaultLayout';

export const Home = () => {
	const dummyContacts: Contact[] = [
		{ name: 'Aisha', email: 'aisha@aisha.com', truncatedLastMessage: 'Hi!' },
		{
			name: 'Champa',
			email: 'champa@champa.com',
			truncatedLastMessage: 'Hola!',
		},
	];
	return (
		<DefaultLayout title='Messages'>
			<ContactList contacts={dummyContacts} />
		</DefaultLayout>
	);
};
