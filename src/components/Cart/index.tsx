import * as Dialog from '@radix-ui/react-dialog';
import { X } from "phosphor-react";
import { CartButton } from "../CartButton";
import { CartClose, CartContent, CartProduct, CartProductImage, CartProductDetails, CartCheckout, CartCheckoutDetails } from './styles';
import Image from 'next/image';

export function Cart() {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <CartButton />
            </Dialog.Trigger>

            <Dialog.Portal>
                <CartContent>
                    <CartClose>
                        <X size={24} weight="bold" />
                    </CartClose>

                    <h2>Sacola de compras</h2>

                    <section>
                        {/* <p>Parece que seu carrinho está vazio :( </p> */}

                        <CartProduct>
                            <CartProductImage>
                                <Image src="" width={100} height={93} alt="" />
                            </CartProductImage>

                            <CartProductDetails>
                                <p>Produto 1</p>
                                <strong>R$ 50,00</strong>
                                <button>Remover</button>
                            </CartProductDetails>
                        </CartProduct>
                    </section>

                    <CartCheckout>
                        <CartCheckoutDetails>
                            <div>
                                <p>Quantidade</p>
                                <p>2 itens</p>
                            </div>
                            <div>
                                <p>Valor Total</p>
                                <p>R$ 100,00</p>
                            </div>
                        </CartCheckoutDetails>
                        <button>Finalizar compra</button>
                    </CartCheckout>
                </CartContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}