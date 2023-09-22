'use client';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/firebase/firestore/deleteData';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

const ITEM_HEIGHT = 48;
const EDIT_OPTION = 'Edit';
const DELETE_OPTION = 'Delete';

export const PostOptions = ({
    isAdmin,
    isPostOwner,
    postId
}: {
    isAdmin: boolean;
    isPostOwner: boolean;
    postId: string;
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const router = useRouter();
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (selectedOption === EDIT_OPTION) {
            router.push(`/post/edit?postId=${postId}`);
        } else if (selectedOption === DELETE_OPTION) {
            handleDeletePressed();
        }
        setSelectedOption(null);
    }, [selectedOption]);

    const handleDeletePressed = () => {
        setConfirmDelete(true);
    };

    const handleDelete = async () => {
        setConfirmDelete(false);
        deletePost(postId).then(() => {
            window.location.reload();
        });
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(null);
    };

    const options: string[] = [];

    if (isAdmin) {
        options.push(...[EDIT_OPTION, DELETE_OPTION]);
    } else if (isPostOwner) {
        options.push(EDIT_OPTION);
    }

    return options.length ? (
        <>
            <IconButton
                aria-label="more"
                id="button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5
                    }
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={() => {
                            setSelectedOption(option);
                            setAnchorEl(null);
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>

            <Dialog
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                aria-labelledby="confirm-delete"
                aria-describedby="confirm-delete"
            >
                <DialogTitle id="confirm-delete">
                    {'Are you sure you want to delete this record?'}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    ) : (
        <></>
    );
};
