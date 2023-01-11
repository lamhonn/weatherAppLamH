import { 
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button
} from '@mui/material';

// a simple navbar component
export default function Navbar() {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundColor: "#87CEEB"}}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6">
                        WEATHER
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}