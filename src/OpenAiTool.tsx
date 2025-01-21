import OpenAI from 'openai';


const VITE_APP_API_KEY='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';


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