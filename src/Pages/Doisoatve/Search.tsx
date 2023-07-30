import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

const useStyles = makeStyles({
    textField: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: 'none',
            },
            height: '40px',
            width: '327px',
        },
        backgroundColor: '#F7F7F8',
        borderRadius: '12px',

        fontStyle: 'italic',
    },
    search: {},
});

const SearchDoisoatve: React.FC = () => {
    const classes = useStyles();

    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };
    return (
        <TextField
            style={{
                marginLeft: '20px',
                // marginTop: '20px',
            }}
            className={classes.textField}
            id="searchve"
            placeholder="Tìm bằng số vé"
            value={searchValue}
            onChange={handleSearchChange}
            InputProps={{
                endAdornment: <SearchIcon />,
            }}
        />
    );
};

export default SearchDoisoatve;
