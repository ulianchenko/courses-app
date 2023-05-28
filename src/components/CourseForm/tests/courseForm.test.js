import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CourseForm from '../CourseForm';

import filteredCourseAuthorsFromIds from '../../../helpers/filteredCourseAuthorsFromIds';
import filteredAuthorsFromIds from '../../../helpers/filteredAuthorsFromIds';
import {
	mockedCoursesList,
	mockedAuthorsList,
	buttonText,
	placeholderText,
	urls,
} from '../../../constants';

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
const updateInfo = {
	id: 'testId',
	title: 'testTitle',
	description: 'testDescription',
	duration: 333,
	courseAuthorsIdsArr: mockedCoursesList[0].authors,
};

describe('CourseForm', () => {
	it('should show authors lists (all and course authors)', () => {
		const route = urls.addCourse;

		const { container } = render(
			<Provider store={mockedStore}>
				<MemoryRouter initialEntries={[route]}>
					<CourseForm updateInfo={updateInfo} />
				</MemoryRouter>
			</Provider>
		);
		const courseAuthorsElements = container.querySelectorAll(
			'.courseAuthors-courseAuthorName'
		);
		let courseAuthorsStr = '';
		courseAuthorsElements.forEach(
			(elem) => (courseAuthorsStr += elem.textContent)
		);

		const mokedCourseAuthorsStr = filteredCourseAuthorsFromIds(
			mockedAuthorsList,
			updateInfo.courseAuthorsIdsArr
		)
			.map((mockedCourseAuthor) => mockedCourseAuthor.name)
			.join('');

		expect(courseAuthorsStr === mokedCourseAuthorsStr).toBeTruthy();

		const authorsElements = container.querySelectorAll('.authors-authorName');

		let authorsStr = '';
		authorsElements.forEach((elem) => (authorsStr += elem.textContent));

		const mokedAuthorsStr = filteredAuthorsFromIds(
			mockedAuthorsList,
			updateInfo.courseAuthorsIdsArr
		)
			.map((mockedAuthor) => mockedAuthor.name)
			.join('');

		expect(authorsStr === mokedAuthorsStr).toBeTruthy();
	});

	it('"Create author" button click should call dispatch', () => {
		const route = urls.addCourse;

		render(
			<Provider store={mockedStore}>
				<MemoryRouter initialEntries={[route]}>
					<CourseForm updateInfo={updateInfo} />
				</MemoryRouter>
			</Provider>
		);

		fireEvent.change(screen.getByPlaceholderText(placeholderText.authorName), {
			target: { value: 'testAuthorName' },
		});
		fireEvent.click(screen.getByText(`${buttonText.createAuthor}`));
		expect(mockedStore.dispatch).toHaveBeenCalled();
	});

	it('"Add author" button click should add an author to course authors list', () => {
		const route = urls.addCourse;

		const { container } = render(
			<Provider store={mockedStore}>
				<MemoryRouter initialEntries={[route]}>
					<CourseForm updateInfo={updateInfo} />
				</MemoryRouter>
			</Provider>
		);

		const authorsElementsBefore = container.querySelectorAll(
			'.authors-authorName'
		);

		let authorsStrBefore = '';
		authorsElementsBefore.forEach(
			(elem) => (authorsStrBefore += elem.textContent)
		);

		let courseAuthorsElementsBefore = container.querySelectorAll(
			'.courseAuthors-courseAuthorName'
		);
		let courseAuthorsStrBefore = '';
		courseAuthorsElementsBefore.forEach(
			(elem) => (courseAuthorsStrBefore += elem.textContent)
		);

		const firstAddAuthorButton = container.querySelector(
			'.authors-authorsItem button'
		);

		fireEvent.click(firstAddAuthorButton);

		const authorsElementsAfter = container.querySelectorAll(
			'.authors-authorName'
		);

		let authorsStrAfter = '';
		authorsElementsAfter.forEach(
			(elem) => (authorsStrBefore += elem.textContent)
		);

		let courseAuthorsElementsAfter = container.querySelectorAll(
			'.courseAuthors-courseAuthorName'
		);
		let courseAuthorsStrAfter = '';
		courseAuthorsElementsAfter.forEach(
			(elem) => (courseAuthorsStrAfter += elem.textContent)
		);

		expect(
			authorsStrAfter.includes(authorsElementsBefore[0].textContent)
		).toBeFalsy();
		expect(
			courseAuthorsStrAfter.includes(authorsElementsBefore[0].textContent)
		).toBeTruthy();
	});

	it('"Delete author" button click should delete an author from the course list', () => {
		const route = urls.addCourse;

		const { container } = render(
			<Provider store={mockedStore}>
				<MemoryRouter initialEntries={[route]}>
					<CourseForm updateInfo={updateInfo} />
				</MemoryRouter>
			</Provider>
		);

		const authorsElementsBefore = container.querySelectorAll(
			'.authors-authorName'
		);

		let authorsStrBefore = '';
		authorsElementsBefore.forEach(
			(elem) => (authorsStrBefore += elem.textContent)
		);

		let courseAuthorsElementsBefore = container.querySelectorAll(
			'.courseAuthors-courseAuthorName'
		);
		let courseAuthorsStrBefore = '';
		courseAuthorsElementsBefore.forEach(
			(elem) => (courseAuthorsStrBefore += elem.textContent)
		);

		const firstCourseDeleteAuthorButton = container.querySelector(
			'.courseAuthors-courseAuthorsItem button'
		);

		fireEvent.click(firstCourseDeleteAuthorButton);

		const authorsElementsAfter = container.querySelectorAll(
			'.authors-authorName'
		);

		let authorsStrAfter = '';
		authorsElementsAfter.forEach(
			(elem) => (authorsStrAfter += elem.textContent)
		);

		let courseAuthorsElementsAfter = container.querySelectorAll(
			'.courseAuthors-courseAuthorName'
		);
		let courseAuthorsStrAfter = '';
		courseAuthorsElementsAfter.forEach(
			(elem) => (courseAuthorsStrAfter += elem.textContent)
		);

		expect(
			authorsStrAfter.includes(courseAuthorsElementsBefore[0].textContent)
		).toBeTruthy();
		expect(
			courseAuthorsStrAfter.includes(courseAuthorsElementsBefore[0].textContent)
		).toBeFalsy();
	});
});
