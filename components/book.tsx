"use client";

import { useRouter } from "next/navigation";
import style from "../styles/book.module.css";
import { useSetRecoilState } from "recoil";
import { bookCatagory } from "../state";

interface IBookPros {
	$name: string;
	$key: string;
}
export default function Book({ $name, $key }: IBookPros) {
	const router = useRouter();
	const setBookCatagory = useSetRecoilState(bookCatagory);

	const onClick = () => {
		setBookCatagory($key);
		router.push(`/list/${$key}`);
	};
	return (
		<div className={style.container} onClick={onClick}>
			<div>{$name} &rarr;</div>
		</div>
	);
}
