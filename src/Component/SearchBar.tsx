import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    textField: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: 'none',
            },
            height: '40px',
            width: '340px',
        },
        backgroundColor: '#EDEDED',
        borderRadius: '12px',
        fontStyle: 'italic',
    },
    search: {},
});

const SearchBar: React.FC = () => {
    const classes = useStyles();
    return (
        <TextField
            className={classes.textField}
            id="search"
            placeholder="Search"
            InputProps={{
                endAdornment: <SearchIcon />,
            }}
        />
    );
};

export default SearchBar;
