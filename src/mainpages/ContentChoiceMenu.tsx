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
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-a6DTGeUU292F2DK1urKZWOWm.png?st=2025-01-29T08%3A39%3A26Z&se=2025-01-29T10%3A39%3A26Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T01%3A09%3A25Z&ske=2025-01-30T01%3A09%3A25Z&sks=b&skv=2024-08-04&sig=TkQmXjgeSm43Z/CmdufEL5NP%2BPOkqFqd7sB4aZ3fjjs%3D'
        },
        {
            id: 2,
            name: 'Austin Powers',
            type: 'Movie',
            year: 1999,
            image: 'https://i.ibb.co/352Kkh9W/img-f3-RQ3-XG11ob-D8cuf-W4-S0m-YEI.png'
        },
        {
            id: 3,
            name: 'The Godfather',
            type: 'Movie',
            year: 1972,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-tY0nnQGvhXzuwRqsS4OQhHdg.png?st=2025-01-29T08%3A40%3A33Z&se=2025-01-29T10%3A40%3A33Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T00%3A57%3A51Z&ske=2025-01-30T00%3A57%3A51Z&sks=b&skv=2024-08-04&sig=SYxvlyBZKjf1WUVRKYQYNqAvU/EyvE0HbF7Ota9VIZE%3D'
        },
        {
            id: 4,
            name: 'The Avengers',
            type: 'Movie',
            year: 2012,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-FrAtRBXiIAGzcLtO5o9rStUQ.png?st=2025-01-29T08%3A41%3A28Z&se=2025-01-29T10%3A41%3A28Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T00%3A50%3A13Z&ske=2025-01-30T00%3A50%3A13Z&sks=b&skv=2024-08-04&sig=EGErcg69w5CZQojEQ1PmuLibQjdGFoDUFBnSDsSDi68%3D'
        },
        {
            id: 5,
            name: 'Inception',
            type: 'Movie',
            year: 2010,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-xWZFRLZqoGvZ1ceZ5sbpgoMT.png?st=2025-01-29T08%3A53%3A18Z&se=2025-01-29T10%3A53%3A18Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T01%3A08%3A04Z&ske=2025-01-30T01%3A08%3A04Z&sks=b&skv=2024-08-04&sig=xGJ9pCAPLx887RHq9Qoe91euaG64nrwfNwJJN/bmZZc%3D'
        },
        {
            id: 6,
            name: 'Interstellar',
            type: 'Movie',
            year: 2014,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-SXLL8Y4LqgHQmlri0Y8MXhFd.png?st=2025-01-29T08%3A54%3A52Z&se=2025-01-29T10%3A54%3A52Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T08%3A15%3A25Z&ske=2025-01-30T08%3A15%3A25Z&sks=b&skv=2024-08-04&sig=1PeKrwagVfV6Mgl0pJGD9s1A2kGxBRBSUSkcJPV9eeg%3D'
        },
        {
            id: 7,
            name: 'Game of Thrones',
            type: 'TV Show',
            year: 2011,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-AeAfZzHTEczLWTE0MtjgZ0Pl.png?st=2025-01-29T08%3A48%3A14Z&se=2025-01-29T10%3A48%3A14Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T00%3A09%3A12Z&ske=2025-01-30T00%3A09%3A12Z&sks=b&skv=2024-08-04&sig=R1Xx/D09wI4tlZpuEa5aSGT1PQyVogPv53nCUIvwS90%3D'
        },
        {
            id: 8,
            name: 'Breaking Bad',
            type: 'TV Show',
            year: 2008,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-qc6X6IkHhzuiiuE4tGaWFCJc.png?st=2025-01-29T08%3A55%3A57Z&se=2025-01-29T10%3A55%3A57Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T01%3A02%3A04Z&ske=2025-01-30T01%3A02%3A04Z&sks=b&skv=2024-08-04&sig=GQECLBrcjO8kwn1lBbPWYOToBdwo5qb5vtXjWO373q4%3D'
        },
        {
            id: 9,
            name: 'House, M.D.',
            type: 'TV Show',
            year: 2004,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-cjWJmHhVcURBVdMnt7Fgo0ln.png?st=2025-01-29T09%3A01%3A26Z&se=2025-01-29T11%3A01%3A26Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T00%3A56%3A54Z&ske=2025-01-30T00%3A56%3A54Z&sks=b&skv=2024-08-04&sig=DOrjm%2BV7V0MQ1lU8IbuQvuDiRWbGw%2B7GI%2By0%2BuBCl00%3D'
        },
        {
            id: 10,
            name: 'Lost',
            type: 'TV Show',
            year: 2004,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-fakTvI1QqCAkbfOl4X9s9ZVl.png?st=2025-01-29T09%3A01%3A07Z&se=2025-01-29T11%3A01%3A07Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T01%3A21%3A01Z&ske=2025-01-30T01%3A21%3A01Z&sks=b&skv=2024-08-04&sig=uvzfMz1NkYS4ry8hzP/MBCRb2RYtFOzDZ3kN0z3B3e0%3D'
        },
        {
            id: 11,
            name: 'The Office',
            type: 'TV Show',
            year: 2005,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-UNpFggxxwuPdEKa9f2fISX2r.png?st=2025-01-29T08%3A57%3A09Z&se=2025-01-29T10%3A57%3A09Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T00%3A56%3A58Z&ske=2025-01-30T00%3A56%3A58Z&sks=b&skv=2024-08-04&sig=bEKsrmXo4L2s3gQfPMJsEU44RtmkeRCfWyEE56zmn0A%3D'
        },
        {
            id: 12,
            name: 'Naruto',
            type: 'Anime',
            year: 2002,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-5fIRE2JDD7rmEXRzPjHVAtlw.png?st=2025-01-29T09%3A01%3A56Z&se=2025-01-29T11%3A01%3A56Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T00%3A54%3A33Z&ske=2025-01-30T00%3A54%3A33Z&sks=b&skv=2024-08-04&sig=0HQdWthxd1dEu8TNNOm51Ar2f3f9loyhSaXuK5/UH6U%3D'
        },
        {
            id: 13,
            name: 'Dragon Ball Z',
            type: 'Anime',
            year: 1989,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-VhP5TFB95NRtM34aGRnDJvWx.png?st=2025-01-29T09%3A02%3A59Z&se=2025-01-29T11%3A02%3A59Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T01%3A32%3A51Z&ske=2025-01-30T01%3A32%3A51Z&sks=b&skv=2024-08-04&sig=BNHC7uOZFZPWWBuNt8PgSynuLqRxMUu6XjWI3fs%2Ba%2B8%3D'
        },
        {
            id: 14,
            name: 'Attack on Titan',
            type: 'Anime',
            year: 2013,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-gBWsnFSkns6gVesRanIAdC5B.png?st=2025-01-29T09%3A03%3A20Z&se=2025-01-29T11%3A03%3A20Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T01%3A25%3A38Z&ske=2025-01-30T01%3A25%3A38Z&sks=b&skv=2024-08-04&sig=6t9bal0o0fVor5g1ocTg8i3k3VkNxHKmcPuG69eqHJ0%3D'
        },
        {
            id: 15,
            name: 'One Piece',
            type: 'Anime',
            year: 1999,
            image: ''
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
            name: 'JoJo\'s Bizarre Adventure',
            type: 'Anime',
            year: 2012,
            image: '/assets/fma.jpg'
        },
        {
            id: 18,
            name: 'Bleach',
            type: 'Anime',
            year: 2004,
            image: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-4yxEpBofFsHFIv4epreL3ljb/user-bDEESpDdAU03CmOwcIIQplLl/img-4D2OpDGMizUrGvyny5NXGQf6.png?st=2025-01-29T08%3A50%3A32Z&se=2025-01-29T10%3A50%3A32Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-01-29T08%3A21%3A51Z&ske=2025-01-30T08%3A21%3A51Z&sks=b&skv=2024-08-04&sig=x1Q3kbw6jG1x1Z/0oghU9GZVIQnfvzy37z4HDur9s2M%3D'
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
            <div className="home buttons">
                <Button destination="/collection" buttontext="Check Collection"/>
                <Button destination="/" buttontext="Back to Home"/>
            </div>
        </>
    )
}