const BOOK_API = "https://books-api.nomadcoders.workers.dev";

export function getBookList() {
	return fetch(`${BOOK_API}/lists`).then((res) => res.json());
}

export function getBookDetail(name: string) {
	return fetch(`${BOOK_API}/list?name=${name}`).then((res) => res.json());
}