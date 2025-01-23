import OpenAI from 'openai';

export default function OpenAiTool(selectionName:string, typeOfContent:string) {
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_APP_API_KEY, // This is also the default, can be omitted
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