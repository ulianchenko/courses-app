const pipeDuration = (duration, { minutesInHour, showZeroLessThan }) => {
	const hours =
		Math.floor(duration / minutesInHour) < showZeroLessThan
			? `0${Math.floor(duration / minutesInHour)}`
			: `${Math.floor(duration / minutesInHour)}`;
	const minutes =
		duration % minutesInHour < showZeroLessThan
			? `0${duration % minutesInHour}`
			: `${duration % minutesInHour}`;
	return `${hours}:${minutes}`;
};
export default pipeDuration;
