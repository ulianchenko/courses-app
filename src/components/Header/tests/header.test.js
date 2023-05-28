import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from '../Header';

import { urls } from '../../../constants';

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

describe('Header', () => {
	it("should have logo and user's name", () => {
		const route = urls.home;

		const { container } = render(
			<Provider store={mockedStore}>
				<MemoryRouter initialEntries={[route]}>
					<Header
						loggedIn={mockedState.user.isAuth}
						userName={mockedState.user.name}
					/>
				</MemoryRouter>
			</Provider>
		);

		expect(container.querySelector('.header svg')).toBeInTheDocument();
		expect(
			container.querySelector('.header-login__username')
		).toHaveTextContent(mockedState.user.name);
	});
});
