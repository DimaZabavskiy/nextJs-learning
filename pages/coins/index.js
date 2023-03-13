import Link from "next/link";
import Image from "next/image";
import bgrImg from "public/Subtract.png";

// This function gets called at build time
export const getStaticProps = async () => {
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
                coins: coins.map(({ id, name, description }) => ({ id, name, description }))
            },
        }
    } catch (e) {
        return {
            props: { coins: null },
        }
    }
}

const Coins = ({ coins }) => {

    if (!coins) {
        return (
            <p>Coins aren&apos;t received</p>
        )
    }

    return (
        <>
            <ul>
                {coins.map(coin => (
                    <li key={coin.id}>
                        <Link href={`/coins/${coin.id}`}>
                            <h3>{coin.name}</h3>
                        </Link>
                        <p>{coin.description}</p>
                    </li>
                ))}
            </ul>
            {/*<Image*/}
            {/*    src={bgrImg}*/}
            {/*    alt="Picture of the author"*/}
            {/*    // width={500} automatically provided*/}
            {/*    // height={500} automatically provided*/}
            {/*    // blurDataURL="data:..." automatically provided*/}
            {/*    // placeholder="blur" // Optional blur-up while loading*/}
            {/*/>*/}
            <Image
                src="https://www.sber-bank.by/images/BPSsite/up/39138/BANNER_8_MARCH.png"
                alt="Picture of the author"
                width={500}
                height={500}
            />
        </>
    )
}

export default Coins;