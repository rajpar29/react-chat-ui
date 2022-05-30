import { AppBar, Toolbar, Box } from '@mui/material';

import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';


export const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='sticky' elevation={0} color='transparent'>
                <Toolbar sx={{ justifyContent: 'end' }}>
                    <ThemeSwitcher />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
