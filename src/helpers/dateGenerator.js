const dateGenerator = () => {
	const now = new Date();
	return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
};

export default dateGenerator;
