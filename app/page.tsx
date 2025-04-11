import { Metadata } from "next";
import { getBookList } from "../api";
import Book from "../components/book";
import styles from "../styles/main.module.css";

export const metadata: Metadata = {
	title: "Books Catagory",
};

export default async function RootPage() {
	const books = (await getBookList()).results;
	return (
		<div className={styles.container}>
			<div className={styles.title}>THE NEW YORK TIMES BEST SELLER EXPLORER</div>
			<div className={styles.list_container}>
				{books.map((book) => (
					<Book key={book.list_name_encoded} $name={book.list_name} $key={book.list_name_encoded} />
				))}
			</div>
		</div>
	);
}
