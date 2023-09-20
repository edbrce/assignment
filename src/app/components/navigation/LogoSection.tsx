import React from 'react';
import Link from "next/link";
import Image from "next/image";

const LogoSection = () => {
    return (
        <div>
            <Link href="/" style={{ display: "block" }}>
                <Image
                    src="/images/IMDb.png"
                    alt="Logo"
                    width={"120"}
                    height={"36"}
                    className="relative"
                />
            </Link>
        </div>
    )
}

export default LogoSection;