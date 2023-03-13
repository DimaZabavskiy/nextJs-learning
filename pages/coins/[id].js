import Link from "next/link";
import { useRouter } from 'next/router'

// This function gets called at build time
export const getStaticPaths = async () => {
    // Call an external API endpoint to get coins
    const res = await fetch(`${process.env.API_HOST}/Portal/public/coins/list`);
    const coins = await res.json();

    // Get the paths we want to pre-render based on coins
    const paths = coins.map((coin) => ({
        params: { id: coin.id.toString() },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This function gets called at build time
export const getStaticProps = async (context) => {
    const { id } = context.params;

    try {
        // Call an external API endpoint to get coins
        const res = await fetch(`${process.env.API_HOST}/Portal/public/coins/list`);
        const coins = await res.json();

        if (!coins) {
            return {
                notFound: true,
            }
        }

        // By returning { props: { coins } }, the Coins component
        // will receive `coins` as a prop at build time
        return {
            props: {
                coin: coins.find(({ id: coinId }) => coinId.toString() === id) || null,
                coinId: id
            },
        }
    } catch (e) {
        return {
            props: {
                coin: null,
                coinId: id
            },
        }
    }
}


/*export const getServerSideProps = async (context) => {
    const { id } = context.params;

    // Call an external API endpoint to get coins
    // const res = await fetch(`${process.env.API_HOST}/Portal/public/coins/list`);
    const coins = await getCoins();

    if (!coins) {
        return {
            notFound: true,
        }
    }

    // By returning { props: { coins } }, the Coins component
    // will receive `coins` as a prop at build time
    return {
        props: {
            coin: coins.find(({ id: coinId }) => coinId.toString() === id) || null,
            coinId: id
        },
    }
};

const getCoins = () => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout( async () => {
                const res = await fetch(`${process.env.API_HOST}/Portal/public/coins/list`);
                const coins = await res.json();
                resolve(coins);
            }, 5000)
        } catch (e) {
            reject('getCoins error: ' + JSON.stringify(e))
        }
    })
}*/

const Coin = ({ coin, coinId }) => {

    const router = useRouter();
    console.log("Coin router: ", router);
    const { id } = router.query;
    console.log("Coin id: ", id);

    if (!coin) {
        return (
            <h4>There is no information about coin with id <strong>{coinId}</strong></h4>
        )
    }

    return (
        <div>
            <p style={{ marginBottom: "40px" }}>
                <Link href={"/coins"}>Все монеты</Link>
            </p>
            <h2>{coin.name}</h2>
            <p>{coin.description}</p>0
            <p>obvers: {coin.obversDescr}</p>
            <p>revers: {coin.reversDescr}</p>
            <p>price: {coin.priceSell}</p>
        </div>
    )
};



export default Coin;