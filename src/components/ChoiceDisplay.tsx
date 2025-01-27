import { useNavigate } from 'react-router-dom';
import './styles/ChoiceDisplay.css'

export default function ChoiceDisplay({id, name, type, year, image, isClickable = true}: { id: number; name: string; type: string; year: number; image: string; isClickable?: boolean }) {

    const navigate = useNavigate();

    const choiceClickHandler = () => {
        navigate(`/contentchoice/${id}`, {state: {id, name, type, year, image}})
    }
    return (
        <div
        className={`p-4 rounded shadow border border-gray-300 max-w-xs mx-auto transition-all duration-300 hover:shadow-lg ${
            isClickable ? 'hover:border-blue-500 cursor-pointer' : ''
        }`}
        onClick={isClickable ? choiceClickHandler : undefined}
        style={{ width: '350px', height: '300px' }}
    >
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <h2 className="mb-2">{`${type} from ${year}`}</h2>
        <img
            src={image}
            alt={`${id}, ${name}`}
            className="object-cover rounded w-full h-48"
        />
    </div>
    )
}