import {FC, useState} from "react";
import { 
    Button,
    TextField 
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Grid from "@mui/material/Grid";

interface SearchLocationProps {
    onSearch: (search: string) => void;
}

// Search bar and button component
export const SearchLocation: FC<SearchLocationProps> = ({onSearch}) => {
    const [searchLocation, setSearchLocation] = useState("");
    const disableSearch = searchLocation.trim() === "";

    const search = () => {
        // pass searchLocation to onSearch
        onSearch(searchLocation);
        setSearchLocation("");
    };

    return(
        <Grid container justifyContent="center" spacing={0.5} >
            <Grid item xs={3}>
                <TextField 
                    value={searchLocation}
                    onChange={e => setSearchLocation(e.target.value)} 
                    label="Search"
                    fullWidth
                />
            </Grid>
            <Grid item>
                <Button 
                    variant="contained"
                    onClick={search} 
                    disabled={disableSearch}
                    sx={{height:55}}
                >
                    <SearchIcon fontSize="large" />
                </Button>
            </Grid>
        </Grid>
    );
}
