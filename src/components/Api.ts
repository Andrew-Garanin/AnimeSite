
class Api {
    /**
     * Server address with cards storage.
     */
    address = 'http://localhost:3000/cards'

    /**
     * Gets cards from server starting from start number to end.
     * If the number exceeds the maximum possible index, then the maximum possible index will be taken.
     * @param start Starting index of the card sequence
     * @param end Max index of hte card sequence.
     * @returns Card list in json format.
     */
    getCards = async (start: number, end: number) => {
        const response = await fetch(`${this.address}?_start=${start}&_end=${end}`);
        return await response.json();
    }

    /**
     * Gets count of cards on the server.
     * @returns Count of cards on the server.
     */
    getCardsNumber = async () => {
        const response = await fetch(this.address);
        let data = await response.json()
        return data.length;
    }

    /**
     * Calculates last card id.
     * @returns Last card id.
     */
    getLastID = async () => {
        const response = await fetch(this.address);
        let data = await response.json()
        let ids: number[] = []
        data!.map((card: { id: number }) => (ids.push(card.id)))
        return Math.max.apply(null, ids)
    }

    /**
     * Deletes card from server by card id.
     * @param id Card id to delete it by.
     */
    removeItem = async (id: number) => {
        await fetch(`${this.address}/${id}`, { method: 'DELETE' });
    }

    /**
     * Updates card by card id.
     * @param id Card id to identify it by.
     * @param src_reference New source reference.
     * @param title New title.
     * @param text New description text.
     * @param image_reference New image reference.
     * @returns Updated card in json format.
     */
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

    /**
     * Adds new card to the server.
     * @param id Card id.
     * @param src_reference Source reference.
     * @param title Title.
     * @param text Description text.
     * @param image_reference Image reference.
     */
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

        await fetch(this.address, requestOptions);
    }
}

export var api = new Api()
