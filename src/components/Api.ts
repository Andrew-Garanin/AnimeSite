
class Api {
    getCardsNumber = async () => {
        const response = await fetch('http://localhost:3000/cards');
        let a =  await response.json()
        return a.length;
    }

    getCards = async (start:number, end:number) => {
        const response = await fetch(`http://localhost:3000/cards?_start=${start}&_end=${end}`);
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
                src_reference: image_reference
            })
        };

        const response = await fetch(`http://localhost:3000/cards/`, requestOptions);
        return await response.json();
    }
}

export var api = new Api()
