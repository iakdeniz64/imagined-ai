import ChoiceDisplay from "../components/ChoiceDisplay";
import './styles/ContentChoiceMenu.css'
import Button from "../components/Button";

export default function ContentChoiceMenu() {
    
    const jsonList = [
        {
            id: 1,
            name: 'Austin Powers',
            type: 'Movie',
            year: 1999,
            image: 'https://i.ibb.co/352Kkh9W/img-f3-RQ3-XG11ob-D8cuf-W4-S0m-YEI.png'
        },
        {
            id: 2,
            name: 'The Avengers',
            type: 'Movie',
            year: 2012,
            image: 'https://i.ibb.co/qLfvWsyy/O5-Sv3-H9-Ij-Ndfnx9cwc.png'
        },
        {
            id: 3,
            name: 'Interstellar',
            type: 'Movie',
            year: 2014,
            image: 'https://i.ibb.co/GQDLVj1d/png-skoid-d505667d-d6c1-4a0a-bac7-5c84a87759f8-sktid-a48cca56-e6da-484e-a814-9c849652bcb3-skt-2025-0.png'
        },
        {
            id: 4,
            name: 'Game of Thrones',
            type: 'TV Show',
            year: 2011,
            image: 'https://i.ibb.co/ZnGQDwX/Hcb3n6v-Vp-U.png'
        },
        {
            id: 5,
            name: 'Breaking Bad',
            type: 'TV Show',
            year: 2008,
            image: 'https://i.ibb.co/Xf0Vwmpg/q-X54shims-SLKZo-P1-Q.png'
        },
        {
            id: 6,
            name: 'House, M.D.',
            type: 'TV Show',
            year: 2004,
            image: 'https://i.ibb.co/DDpPNDBm/png-skoid-d505667d-d6c1-4a0a-bac7-5c84a87759f8-sktid-a48cca56-e6da-484e-a814-9c849652bcb3-skt-2025-0.png'
        },
        {
            id: 7,
            name: 'Dragon Ball Z',
            type: 'Anime',
            year: 1989,
            image: 'https://i.ibb.co/zWrTL2yy/8f-VIxp0-M.png'
        },
        {
            id: 8,
            name: 'One Piece',
            type: 'Anime',
            year: 1999,
            image: 'https://i.ibb.co/GQytckz9/AMh00m-Ol-Wynhugh0.png'
        },
        {
            id: 9,
            name: 'My Hero Academia',
            type: 'Anime',
            year: 2016,
            image: 'https://i.ibb.co/mCZYZSBq/png-skoid-d505667d-d6c1-4a0a-bac7-5c84a87759f8-sktid-a48cca56-e6da-484e-a814-9c849652bcb3-skt-2025-0.png'
        }
    ]
    
    const itemsOrganizedList = jsonList.map((item) => {
        return (
            <ChoiceDisplay
                key={item.id}
                id={item.id}
                name={item.name}
                type={item.type}
                year={item.year}
                image={item.image}
            />
        )
    })

    return (
        <>
            <h2 className="text-2xl font-bold text-center mb-6">Choices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {itemsOrganizedList}
            </div>
            <div className="mt-2">
                <Button destination="/collection" buttontext="Check Collection"/>
                <Button destination="/" buttontext="Back to Home"/>
            </div>
        </>
    )
}