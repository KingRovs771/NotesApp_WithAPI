// src/note-item.js
class NoteItem extends HTMLElement {
    constructor() {
        super();
        try {
            this.shadowRoot = this.attachShadow({ mode: 'open' });
            this._note = null;
        } catch (error) {
            console.error('Error attaching shadow root:', error);
        }
    }

    static get observedAttributes() {
        return ['note'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'note') {
            this._note = JSON.parse(newValue);
            this.render();
        }
    }

    render() {
        if (!this._note || !this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    border: 1px solid #eee;
                    padding: 15px;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    min-height: 150px;
                }

                h3 {
                    margin-top: 0;
                    margin-bottom: 10px;
                }

                p {
                    margin-bottom: 10px;
                }

                button {
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 3px;
                    cursor: pointer;
                    margin-top: 10px;
                }
            </style>
            <h3>${this._note.title}</h3>
            <p>${this._note.body}</p>
            <button class="delete-button" data-id="${this._note.id}">Delete</button>
        `;

        const deleteButton = this.shadowRoot.querySelector('.delete-button');
        if (deleteButton) {
            console.log('Delete button found in shadow DOM');
            deleteButton.addEventListener('click', (event) => {
                console.log('Delete button clicked in note-item');
                const noteId = event.target.dataset.id;
                this.dispatchEvent(new CustomEvent('delete-note', { detail: noteId, bubbles : true, composed : true }));
            });
            console.log('Click listener attached to delete button');
        }
    }
}

customElements.define('note-item', NoteItem);
console.log('NoteItem defined');