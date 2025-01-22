import OpenAI from 'openai';


const VITE_APP_API_KEY='REMOVED';


export default function OpenAiTool(selectionName:string, typeOfContent:string) {
    const openai = new OpenAI({
        apiKey: VITE_APP_API_KEY, // This is also the default, can be omitted
        dangerouslyAllowBrowser: true // This is DANGEROUS! Remove later!
    });

    const result = openai.images.generate({
    prompt: (`${selectionName} ${typeOfContent}`),
    n: 1,
    size: "512x512",
    });

    return (
        result
    )
}