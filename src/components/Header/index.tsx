import { HeaderContainer } from "./styles";
import logoImage from '../../assets/logo.svg';
import Image from "next/image";
import Link from "next/link";
import { Cart } from "../Cart";

export function Header() {
    return (
        <HeaderContainer>
            <Link href="/">
                <Image src={logoImage} alt="" />
            </Link>

            <Cart />
        </HeaderContainer>
    )
}