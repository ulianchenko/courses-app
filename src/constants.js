const mockedCoursesList = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];
const mockedAuthorsList = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];

const buttonText = {
	logout: 'Logout',
	search: 'Search',
	addNewCourse: 'Add new course',
	showCourse: 'Show course',
	createCourse: 'Create course',
	createAuthor: 'Create author',
	addAuthor: 'Add author',
	deleteAuthor: 'Delete author',
	registration: 'Registration',
	login: 'Login',
};

const labelText = {
	title: 'Title',
	description: 'Description',
	duration: 'Duration',
	authorName: 'Author name',
	name: 'Name',
	email: 'Email',
	password: 'Password',
};

const placeholderText = {
	search: 'Enter course name...',
	title: 'Enter title...',
	description: 'Enter description...',
	duration: 'Enter duration in minutes...',
	authorName: 'Enter author name...',
	emptyList: 'Authors list is empty...',
	name: 'Enter name...',
	email: 'Enter email...',
	password: 'Enter password...',
};

const titleText = {
	addAuthor: 'Add author',
	authors: 'Authors',
	duration: 'Duration',
	courseAuthors: 'Course authors',
	registration: 'Registration',
	login: 'Login',
};

const paragraphText = {
	authorListEmpty: 'Authors list is empty',
	courseAuthorListEmpty: 'Course authors list is empty',
};

const durationSettings = {
	minutesInHour: 60,
	showZeroLessThan: 10,
	hours: 'hours',
	duration: 'Duration:',
	default: '00:00',
};

const registrationSettings = {
	info: 'If you have an account you can',
	login: 'Login',
};

const loginSettings = {
	info: 'If you do not have an account you can',
	register: 'Register',
};

const courseInfoSettings = {
	linkText: '< Back to courses',
};

const infoSettings = {
	authors: 'Authors:',
	created: 'Created:',
	id: 'ID:',
};

const validateText = {
	title: 'Title name should contain at least 2 characters',
	description: 'Description text should contain at least 2 characters',
	addAuthor: 'Author name should contain at least 2 characters',
	duration: 'Duration should contain only numbers more than 0',
	allFields: 'Please, filled in all fields',
	invalidLoginPassword: 'Invalid login or password',
	invalidRegistrationData: 'Invalid registration data',
};

const http = {
	base: 'http://localhost:4000',
	courses: '/courses/all',
	authors: '/authors/all',
};

export {
	mockedCoursesList,
	mockedAuthorsList,
	buttonText,
	labelText,
	placeholderText,
	titleText,
	durationSettings,
	infoSettings,
	paragraphText,
	validateText,
	registrationSettings,
	loginSettings,
	courseInfoSettings,
	http,
};
