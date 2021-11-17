
interface CardProps {
    id: number;
    image_reference: string;
    title: string;
    text: string;
    src_reference: string;
    refe: string;
}

class Api {
    getCards = async () => {
        const response = await fetch('http://localhost:3000/cards');
        return await response.json();
    }

    removeItem = async (id: number) => {
        const response = await fetch(`http://localhost:3000/cards/${id}`, { method: 'DELETE' });
        return await response.json();
    }

    updateItem = async (id: number,
        src_reference: string,
        title: string,
        text: string,
        image_reference: string) => {

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                src_reference: src_reference,
                title: title,
                text: text,
                image_reference: image_reference
            })
        };

        const response = await fetch(`http://localhost:3000/cards/${id}`, requestOptions);
        return await response.json();
    }

    addItem = async (id: number,
        src_reference: string,
        title: string,
        text: string,
        image_reference: string) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                image_reference: src_reference,
                title: title,
                text: text,
                src_reference: image_reference,
                refe: "google.com"
            })
        };

        const response = await fetch(`http://localhost:3000/cards/`, requestOptions);
        return await response.json();
    }
}

export var api = new Api()
