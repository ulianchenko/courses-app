import { useState } from 'react';

import Header from './components/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';

import './app.scss';

function App() {
	const [openAddNewCourse, setOpenAddNewCourse] = useState(false);

	const handleAddNewCourse = () => setOpenAddNewCourse(true);
	const handleShowCourses = () => setOpenAddNewCourse(false);

	return (
		<div className='container'>
			<Header />
			{openAddNewCourse ? (
				<CreateCourse onShowCourses={handleShowCourses} />
			) : (
				<Courses onAddNewCourse={handleAddNewCourse} />
			)}
		</div>
	);
}

export default App;
