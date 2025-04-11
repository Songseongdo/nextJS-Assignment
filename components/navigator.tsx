"use client";

import styles from "../styles/navigator.module.css";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useRecoilState } from "recoil";
import { bookCatagory } from "../state";
import { useEffect, useState } from "react";

export default function Navigator() {
	const path = usePathname();
	const route = useRouter();
	const [book_catagory, setBookCatagory] = useRecoilState(bookCatagory);
	const { scrollY } = useScroll();
	const [isScrolling, setIsScrolling] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const onClick = (path: string) => {
		route.push(path);
		setBookCatagory(null);
	};

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		const unsubscribe = scrollY.on("change", () => {
			setIsScrolling(true);
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				setIsScrolling(false);
			}, 400);
		});

		return () => {
			unsubscribe();
			clearTimeout(timeout);
		};
	}, [scrollY]);

	return (
		<div className={`${styles.container} ${isScrolling ? styles.transparent : ""}`}>
			<div className={styles.link} onClick={() => onClick("/")}>
				<span>Home</span>
				<AnimatePresence>
					{mounted && book_catagory && (
						<motion.span
							key={book_catagory}
							initial={{ opacity: 0, x: 10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 10 }}
							transition={{ duration: 0.3 }}
							className={styles.sub_title}
						>
							- {book_catagory}
						</motion.span>
					)}
				</AnimatePresence>
				{(path === "/" || path.startsWith("/list/")) && (
					<motion.div layoutId="underline" className={styles.activeLine} />
				)}
			</div>

			<div className={styles.link} onClick={() => onClick("/about")}>
				About US
				{path === "/about" && <motion.div layoutId="underline" className={styles.activeLine} />}
			</div>
		</div>
	);
}
