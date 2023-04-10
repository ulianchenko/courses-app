import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import {
	createBrowserRouter,
	RouterProvider,
	MemoryRouter,
} from 'react-router-dom';

import App from '../../../App';
import PrivateRouter from '../../PrivateRouter';
import Courses from '../Courses';
import CourseForm from '../../CourseForm';

import {
	mockedCoursesList,
	mockedAuthorsList,
	buttonText,
} from '../../../constants';

const mockedState = {
	user: {
		isAuth: true,
		name: 'testName',
		email: 'test@email.com',
		token: 'testToken',
		role: 'admin',
	},
	courses: mockedCoursesList,
	authors: mockedAuthorsList,
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test('Courses should display amount of CourseCard equal length of courses array', () => {
	const route = '/courses';

	const { container } = render(
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={[route]}>
				<Courses />
			</MemoryRouter>
		</Provider>
	);

	expect(container.querySelectorAll('.card').length).toBe(
		mockedCoursesList.length
	);
});

test('Courses should display Empty container if courses array length is 0', () => {
	const route = '/courses';

	const mockedStateZeroCourses = {
		user: {
			isAuth: true,
			name: '',
			email: '',
			token: '',
			role: 'user',
		},
		courses: [],
		authors: mockedAuthorsList,
	};

	const mockedStoreZeroCourses = {
		getState: () => mockedStateZeroCourses,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};

	const { container } = render(
		<Provider store={mockedStoreZeroCourses}>
			<MemoryRouter initialEntries={[route]}>
				<Courses />
			</MemoryRouter>
		</Provider>
	);

	expect(container.querySelectorAll('.card')).toHaveLength(0);
});

test('CourseForm should be showed after a click on a button "Add new course"', () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <App />,
			children: [
				{
					path: '/courses',
					element: <Courses />,
				},
				{
					path: '/courses/add',
					element: <PrivateRouter component={CourseForm} />,
				},
			],
		},
	]);

	const { container } = render(
		<Provider store={mockedStore}>
			<RouterProvider router={router} />
		</Provider>
	);

	fireEvent.click(screen.getByText(`${buttonText.addNewCourse}`));
	expect(container.querySelector('.createCourse')).toBeInTheDocument();
});
