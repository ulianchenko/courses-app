const dateGenerator = () => {
	const now = new Date();
	return `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;
};

export default dateGenerator;
