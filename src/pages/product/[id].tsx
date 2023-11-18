import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';
import Head from 'next/head';
import Image from 'next/image';
import { /*GetServerSideProps,*/ GetStaticPaths, GetStaticProps } from 'next';
import { stripe } from '../../lib/stripe';
import Stripe from 'stripe';
import { useRouter } from 'next/router';
import { useCart } from '../../hooks/useCart';
import { IProduct } from '../../contexts/CartContext';
interface ProductProps {
    product: IProduct;
}

export default function Product({ product }: ProductProps) {
    const  { isFallback } = useRouter();

    const {checkIfProductExistsInCart, addToCart} = useCart();

    const ProductInCart = checkIfProductExistsInCart(product.id);

    if (isFallback) {
        return <p>Loading...</p>
    }

    return (
        <>
        <Head>
            <title>{product.name} | Ignite Shop</title>
        </Head>
        
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>

                <button 
                    onClick={() => addToCart(product)} 
                    disabled={ProductInCart}>
                    {ProductInCart ? 'Produto já está no carrinho' : 'Adicionar no carrinho'}
                </button>
            </ProductDetails>
        
        </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Buscar os produtos mais vendidos / mais acessados

    return {
        paths: [
            { params: { id: 'prod_OQrgJ3N89Ktnux'}}
        ],
        fallback: true
    }
}


/*
// Pagina não foi gerada estacamente, ela é gerada no lado do servidor a cada acesso,
// se 1.000.000 de pessoas acessarem a página ela irá ser gerada 1.000.000 de vezes

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price;    

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(price.unit_amount / 100),
                description: product.description,
              }
        },
    }
}
*/

// Gera as páginas estáticas no build da aplicação
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price;    

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(price.unit_amount / 100),
                numberPrice: price.unit_amount / 100,
                description: product.description,
                defaultPriceId: price.id,
              }
        },
        revalidate: 60 * 60 * 1, // 1 hour chache
    }
}