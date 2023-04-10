import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from '../Header';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		email: '',
		token: '',
		role: '',
	},
	courses: [],
	authors: [],
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test("Header component should have logo and user's name", () => {
	const route = '/';

	const { container } = render(
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={[route]}>
				<Header />
			</MemoryRouter>
		</Provider>
	);

	expect(container.querySelector('.header svg')).toBeInTheDocument();
	expect(container.querySelector('.header-login__username')).toHaveTextContent(
		mockedState.user.name
	);
});
