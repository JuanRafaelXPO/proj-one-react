import './styles.css';

export const TextInput = ({ handleChange, searchValue }) => {
    return(
        < input
            className='text-input'
            onChange = { handleChange }
            value = { searchValue }
            type = 'search'
            placeholder='Faça sua pesquisa'
        />
    );
}