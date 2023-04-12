import { useState } from 'react';

import Input from '../../../../common/Input';
import Button from '../../../../common/Button';

import { buttonText, placeholderText } from '../../../../constants';

import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
	const [inputValue, setInputValue] = useState('');

	const handleChange = ({ target }) => {
		if (target.value.length === 0) {
			onSearch(target.value);
		}
		setInputValue(target.value);
	};

	const handleClickSearch = () => {
		onSearch(inputValue);
	};

	return (
		<div className='search'>
			<div className='search-input'>
				<Input
					onChange={handleChange}
					value={inputValue}
					placeholderText={placeholderText.search}
				/>
			</div>
			<Button buttonText={buttonText.search} onClick={handleClickSearch} />
		</div>
	);
};

export default SearchBar;
