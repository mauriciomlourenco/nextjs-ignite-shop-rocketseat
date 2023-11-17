import { Handbag } from "phosphor-react";
import { CartButtonContainer } from "./styles";
import { ComponentProps } from "@stitches/react";

type CartButtonProps = ComponentProps<typeof CartButtonContainer>;

export function CartButton({ ...rest }: CartButtonProps) {
    return (
        <CartButtonContainer {...rest}>
            <Handbag weight="bold" />
        </CartButtonContainer>
    );
}