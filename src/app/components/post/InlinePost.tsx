"use client"
import { Post } from "@/app/types"
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { Divider } from "@mui/material";

const options = [
    'delete'
]
const ITEM_HEIGHT = 48;

export const InlinePost = (data: Post) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
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
    const { title, body, id, timestamp, author } = data;
    const link = `post/${id}`;

    return (
        <><Link href={link}>
            <div className="flex flex-row p-4 w-[50vw] hover:bg-gray-200 justify-between">
                <div className="flex flex-col">
                    <div className='font-bold'>
                        {title}
                    </div>
                    <div>
                        {body}
                    </div>
                    <div className="italic">
                        <span className="font-semibold">{author} </span>posted on {timestamp.toDate().toLocaleString()}
                    </div>
                </div>
                <IconButton
                    aria-label="more"
                    id="long-button"
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
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                        },
                    }}
                >
                    {options.map((option) => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        </Link><Divider /></>

    )
}