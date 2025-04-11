import { getBookDetail } from "../../../api";
import BookInfo from "../../../components/book-info";
import styles from "../../../styles/detail.module.css";

interface IParams {
	params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: IParams) {
	const { name } = await params;

	return {
		title: `${name}`,
	};
}

export default async function BookDetail({ params }: IParams) {
	const { name } = await params;
	const detail = (await getBookDetail(name)).results;
	return (
		<div className={styles.container}>
			<div className={styles.title}>{detail.list_name_encoded}</div>
			<div className={styles.book_detail_container}>
				{detail?.books.map((book, idx) => (
					<BookInfo
						key={`book_key_${idx}`}
						$title={book.title}
						$author={book.author}
						$img_url={book.book_image}
						$product_url={book.amazon_product_url}
						$buy_link={book.buy_links}
					/>
				))}
			</div>
		</div>
	);
}
