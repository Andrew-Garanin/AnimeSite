import { Box } from "@mui/system";
import { useState } from "react";
import { Body } from "./body";
import { Head } from "./header";


export interface MyCardProps {
    id: number;
    image_reference: string;
    title: string;
    text: string;
    src_reference: string;
    refe: string;
    onClick: () => void;
    getCards: () => void;
}

export const Main = () => {
    const [cards, setCards] = useState<MyCardProps[] | null>(null)
    return (
        <>
            <Head
                cards={cards}
                setCards={setCards} />
            <Box>
                <Body
                    cards={cards}
                    setCards={setCards} />
            </Box>
        </>)
}
