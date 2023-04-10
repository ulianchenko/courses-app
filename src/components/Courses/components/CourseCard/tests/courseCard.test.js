import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CourseCard from '../CourseCard';

import pipeDuration from '../../../../../helpers/pipeDuration';
import createAuthorsStr from '../../../../../helpers/createAuthorsStr';
import {
	mockedCoursesList,
	mockedAuthorsList,
	durationSettings,
} from '../../../../../constants';

const mockedState = {
	user: {
		isAuth: true,
		name: '',
		email: '',
		token: 'test token',
		role: 'user',
	},
	courses: mockedCoursesList,
	authors: mockedAuthorsList,
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test('CourseCard should display title', () => {
	const route = '/courses';

	const { container } = render(
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={[route]}>
				<CourseCard {...mockedCoursesList[0]} authorsList={mockedAuthorsList} />
			</MemoryRouter>
		</Provider>
	);

	expect(container.querySelector('.card-text__title')).toBeInTheDocument();
	expect(container.querySelector('.card-text__title')).toHaveTextContent(
		mockedCoursesList[0].title
	);
});

test('CourseCard should display description', () => {
	const route = '/courses';

	const { container } = render(
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={[route]}>
				<CourseCard {...mockedCoursesList[0]} authorsList={mockedAuthorsList} />
			</MemoryRouter>
		</Provider>
	);

	expect(
		container.querySelector('.card-text__description')
	).toBeInTheDocument();
	expect(container.querySelector('.card-text__description')).toHaveTextContent(
		mockedCoursesList[0].description
	);
});

test('CourseCard should display duration in the correct format', () => {
	const route = '/courses';

	const { container } = render(
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={[route]}>
				<CourseCard {...mockedCoursesList[0]} authorsList={mockedAuthorsList} />
			</MemoryRouter>
		</Provider>
	);

	const durationStr = pipeDuration(
		mockedCoursesList[0].duration,
		durationSettings
	);

	expect(container.querySelector('.card-info__duration')).toHaveTextContent(
		`${durationStr} ${durationSettings.hours}`
	);
});

test('CourseCard should display authors list', () => {
	const route = '/courses';

	const { container } = render(
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={[route]}>
				<CourseCard {...mockedCoursesList[0]} authorsList={mockedAuthorsList} />
			</MemoryRouter>
		</Provider>
	);

	const authorsStr = createAuthorsStr(
		mockedCoursesList[0].authors,
		mockedAuthorsList
	);

	expect(container.querySelector('.card-info__authors')).toBeInTheDocument();
	expect(container.querySelector('.card-info__authors')).toHaveTextContent(
		`${authorsStr}`
	);
});

test('CourseCard should display created date in the correct format', () => {
	const route = '/courses';

	const { container } = render(
		<Provider store={mockedStore}>
			<MemoryRouter initialEntries={[route]}>
				<CourseCard {...mockedCoursesList[0]} authorsList={mockedAuthorsList} />
			</MemoryRouter>
		</Provider>
	);

	expect(container.querySelector('.card-info__created')).toHaveTextContent(
		`${mockedCoursesList[0].creationDate.replace(/\//g, '.')}`
	);
});
