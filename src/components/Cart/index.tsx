import * as Dialog from '@radix-ui/react-dialog';
import { X } from "phosphor-react";
import { CartButton } from "../CartButton";
import { CartClose, CartContent, CartProduct, CartProductImage, CartProductDetails, CartCheckout, CartCheckoutDetails } from './styles';
import Image from 'next/image';
import { useCart } from '../../hooks/useCart';
import { useState } from 'react';
import axios from 'axios';

export function Cart() {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
    const { cartItems, removeCartItem, cartTotalPrice } = useCart();
    const cartQuantity = cartItems.length;
    const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(cartTotalPrice);

    async function handleCheckout() {
        try {
            setIsCreatingCheckoutSession(true);

            const response = await axios.post('/api/checkout', {
                products: cartItems,
            });

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;
        } catch(error) {
            setIsCreatingCheckoutSession(false);
            alert('Falha ao redirecionar para o checkout');
        }
    }

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
                        {cartQuantity <= 0 && (
                            <p>Parece que seu carrinho está vazio :( </p>
                        )}
                        {cartItems.map(cartItem => (
                            <CartProduct key={cartItem.id}>
                                <CartProductImage>
                                    <Image src={cartItem.imageUrl} width={100} height={93} alt="" />
                                </CartProductImage>

                                <CartProductDetails>
                                    <p>{cartItem.name}</p>
                                    <strong>{cartItem.price}</strong>
                                    <button onClick={() => removeCartItem(cartItem.id)}>Remover</button>
                                </CartProductDetails>
                            </CartProduct>
                        ))}

                    </section>

                    <CartCheckout>
                        <CartCheckoutDetails>
                            <div>
                                <p>Quantidade</p>
                                <p>{cartQuantity} {cartQuantity === 1 ? 'item' : 'itens'}</p>
                            </div>
                            <div>
                                <p>Valor Total</p>
                                <p>{formattedCartTotal}</p>
                            </div>
                        </CartCheckoutDetails>
                        <button 
                            disabled={isCreatingCheckoutSession || cartQuantity <= 0} 
                            onClick={() => handleCheckout()}
                        >
                                Finalizar compra
                        </button>
                    </CartCheckout>
                </CartContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}