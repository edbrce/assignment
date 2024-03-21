'use client';
import signOut from '@/firebase/auth/signOut';
import { Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const UserMenu = ({ displayName }: { displayName: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="cursor-pointer lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-200 text-sm text-gray-900 font-bold rounded-xl"
                id="nav-user"
            >
                Hi {displayName}
            </button>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem key={'signout'} onClick={handleSignOut}>
                    Sign out
                </MenuItem>
            </Menu>
        </>
    );
};
