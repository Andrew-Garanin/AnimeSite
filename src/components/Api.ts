
class Api {
    address = 'http://localhost:3000/cards'

    getCards = async (start: number, end: number) => {
        const response = await fetch(`${this.address}?_start=${start}&_end=${end}`);
        return await response.json();
    }

    getCardsNumber = async () => {
        const response = await fetch(this.address);
        let data = await response.json()
        return data.length;
    }

    getLastID = async () => {
        const response = await fetch(this.address);
        let data = await response.json()
        let ids: number[] = []
        data!.map((card: { id: number }) => (ids.push(card.id)))
        return Math.max.apply(null, ids)
    }

    removeItem = async (id: number) => {
        const response = await fetch(`${this.address}/${id}`, { method: 'DELETE' });
        return await response.json();
    }

    updateItem = async (
        id: number,
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

        const response = await fetch(`${this.address}/${id}`, requestOptions);
        return await response.json();
    }

    addItem = async (
        id: number,
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

        const response = await fetch(this.address, requestOptions);
        return await response.json();
    }
}

export var api = new Api()
