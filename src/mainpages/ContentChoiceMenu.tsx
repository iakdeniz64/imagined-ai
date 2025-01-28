import ChoiceDisplay from "../components/ChoiceDisplay";
import './styles/ContentChoiceMenu.css'
import Button from "../components/Button";

export default function ContentChoiceMenu() {
    
    const jsonList = [
        {
            id: 1,
            name: 'Titanic',
            type: 'Movie',
            year: 1997,
            image: '/assets/titanic.jpg'
        },
        {
            id: 2,
            name: 'The Shawshank Redemption',
            type: 'Movie',
            year: 1994,
            image: '/assets/shawshank.jpg'
        },
        {
            id: 3,
            name: 'The Godfather',
            type: 'Movie',
            year: 1972,
            image: '/assets/godfather.jpg'
        },
        {
            id: 4,
            name: 'The Dark Knight',
            type: 'Movie',
            year: 2008,
            image: '/assets/darkknight.jpg'
        },
        {
            id: 5,
            name: 'Inception',
            type: 'Movie',
            year: 2010,
            image: '/assets/inception.jpg'
        },
        {
            id: 6,
            name: 'Interstellar',
            type: 'Movie',
            year: 2014,
            image: '/assets/interstellar.jpg'
        },
        {
            id: 7,
            name: 'Game of Thrones',
            type: 'TV Show',
            year: 2011,
            image: '/assets/got.jpg'
        },
        {
            id: 8,
            name: 'Breaking Bad',
            type: 'TV Show',
            year: 2008,
            image: '/assets/breakingbad.jpg'
        },
        {
            id: 9,
            name: 'Stranger Things',
            type: 'TV Show',
            year: 2016,
            image: '/assets/strangerthings.jpg'
        },
        {
            id: 10,
            name: 'The Crown',
            type: 'TV Show',
            year: 2016,
            image: '/assets/thecrown.jpg'
        },
        {
            id: 11,
            name: 'The Office',
            type: 'TV Show',
            year: 2005,
            image: '/assets/theoffice.jpg'
        },
        {
            id: 12,
            name: 'Naruto',
            type: 'Anime',
            year: 2002,
            image: '/assets/naruto.jpg'
        },
        {
            id: 13,
            name: 'Dragon Ball Z',
            type: 'Anime',
            year: 1989,
            image: '/assets/dbz.jpg'
        },
        {
            id: 14,
            name: 'Attack on Titan',
            type: 'Anime',
            year: 2013,
            image: '/assets/aot.jpg'
        },
        {
            id: 15,
            name: 'One Piece',
            type: 'Anime',
            year: 1999,
            image: '/assets/onepiece.jpg'
        },
        {
            id: 16,
            name: 'My Hero Academia',
            type: 'Anime',
            year: 2016,
            image: '/assets/mha.jpg'
        },
        {
            id: 17,
            name: 'Fullmetal Alchemist: Brotherhood',
            type: 'Anime',
            year: 2009,
            image: '/assets/fma.jpg'
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {itemsOrganizedList}
            </div>
            <div className="home buttons">
                <Button destination="/" buttontext="Back to Home"/>
            </div>
        </>
    )
}