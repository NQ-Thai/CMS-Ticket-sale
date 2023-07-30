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
            width: '327px',
        },
        backgroundColor: '#F7F7F8',
        borderRadius: '12px',

        fontStyle: 'italic',
    },
    search: {},
});

interface SearchDoisoatveProps {
    searchValue: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchDoisoatve: React.FC<SearchDoisoatveProps> = ({ searchValue, onChange }) => {
    const classes = useStyles();
    return (
        <TextField
            style={{
                marginLeft: '20px',
                // marginTop: '20px',
            }}
            className={classes.textField}
            id="searchve"
            placeholder="Tìm bằng số vé"
            onChange={onChange}
            InputProps={{
                endAdornment: <SearchIcon />,
            }}
        />
    );
};

export default SearchDoisoatve;
