import * as React from 'react';

import { dummyContacts } from '../../../../mocks/contacts';
import { ContactList } from '../../organisms/ContactList';
import { DefaultLayout } from '../../organisms/DefaultLayout';

export const Home = () => {
	return (
		<DefaultLayout title='Messages' home>
			<ContactList contacts={dummyContacts} />
		</DefaultLayout>
	);
};
