import React, { useState } from 'react';

import { Palette } from "@mui/icons-material";
import { Divider, IconButton, Menu, Theme, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { TwitterPicker } from 'react-color'

import { updateTheme, watchTheme, createCustomTheme, readPrefferedTheme } from '../../theme';
import { ThemeTypes } from '../../models/ThemeType.enum';


const ThemeSwitcher = () => {

    // Menu open/close
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    // Setting and updating the theme value in Button Group
    const [currentTheme, setCurrentTheme] = useState<ThemeTypes>(readPrefferedTheme());
    
    const handleThemeChange = (
        event: React.MouseEvent<HTMLElement>,
        newTheme: ThemeTypes,
    ) => {
        updateTheme(newTheme)
    };

    watchTheme().subscribe((theme: Theme) => {
        setCurrentTheme(readPrefferedTheme())
    });

    const renderColorPicker = () => {
        if (currentTheme === ThemeTypes.CUSTOM) {
            return (
                <div>
                    <Divider sx={{ marginBottom: '16px' }} />
                    <Typography variant='body1' sx={{ paddingLeft: '16px' }} >
                        Background
                    </Typography>
                    <TwitterPicker
                        triangle='hide'
                        styles={{ default: { card: { background: 'transparent', boxShadow: 'none' } } }}
                        onChangeComplete={(color) => { createCustomTheme({ background: color.hex }); updateTheme(ThemeTypes.CUSTOM) }}
                    />
                    <Typography variant='body1' sx={{ paddingLeft: '16px' }} >
                        Messages
                    </Typography>
                    <TwitterPicker
                        triangle='hide'
                        styles={{ default: { card: { background: 'transparent', boxShadow: 'none' } } }}
                        onChangeComplete={(color) => { createCustomTheme({ paper: color.hex }); updateTheme(ThemeTypes.CUSTOM) }}
                    />
                </div>
            )
        }
    }


    return (
        <>
            <IconButton color="primary" component="span" onClick={handleMenuClick}>
                <Palette />
            </IconButton>
            <Menu anchorEl={menuAnchorEl}
                open={open}
                onClose={handleMenuClose}>
                <ToggleButtonGroup
                    value={currentTheme}
                    exclusive
                    onChange={handleThemeChange}
                    size='large'
                    sx={{ margin: '16px' }}
                >
                    <ToggleButton value={ThemeTypes.LIGHT}>
                        Light
                    </ToggleButton>
                    <ToggleButton value={ThemeTypes.DARK}>
                        Dark
                    </ToggleButton>
                    <ToggleButton value={ThemeTypes.CUSTOM}>
                        Custom
                    </ToggleButton>
                </ToggleButtonGroup>
                {renderColorPicker()}
            </Menu>
        </>
    )
}

export default ThemeSwitcher;