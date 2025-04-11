"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/bookinfo.module.css";
import Overlay from "../components/modal";
import { AnimatePresence, motion } from "framer-motion";

interface IParams {
	$img_url: string;
	$title: string;
	$author: string;
	$product_url: string;
	$buy_link?: { name: string; url: string }[];
}

const overlay = {
	hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
	visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
	exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

export default function BookInfo({ $img_url, $title, $author, $product_url, $buy_link = [] }: IParams) {
	const [isModal, setIsModal] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [show, setShow] = useState(false);
	const [circleRect, setCircleRect] = useState<DOMRect | null>(null);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
		console.log(window.innerWidth);
		console.log(window.innerHeight);
	}, []);

	const openModal = () => {
		setCircleRect(ref.current.getBoundingClientRect());
		setShow(true);

		requestAnimationFrame(() => {
			setIsModal(true);
		});
	};
	const closeModal = () => {
		setIsModal(false);
		setTimeout(() => setShow(false), 400);
	};
	return (
		<div className={styles.book_container}>
			<img src={$img_url} alt="" />
			<div className={styles.text_container}>
				<div className={styles.title}>{$title}</div>
				<div className={styles.author}>{$author}</div>
				<div className={styles.buynow}>Buy now</div>
				<a href={$product_url} target="_blank">
					<div className={styles.url_container}>
						<div className={styles.product_url}>
							<div>Amazon &nbsp;&nbsp; &rarr;</div>
						</div>
					</div>
				</a>
				{$buy_link?.length !== 0 ? (
					<div ref={ref} className={styles.url_container} onClick={openModal}>
						Anothers
					</div>
				) : null}
			</div>

			{mounted && show ? (
				<AnimatePresence>
					{circleRect && !isModal ? (
						<motion.div
							layoutId={`${$title}_layoutId`}
							initial={false}
							transition={{ duration: 0.3 }}
							style={{
								position: "fixed",
								top: circleRect.top,
								left: circleRect.left,
								width: circleRect.width,
								height: circleRect.height,
								borderRadius: "50%",
								transformOrigin: "left top",
							}}
						>
							Anothers
						</motion.div>
					) : (
						<Overlay
							callFn={closeModal}
							$mainBox={
								<motion.div
									layoutId={`${$title}_layoutId`}
									className={styles.modal_container}
									transition={{ duration: 0.5 }}
									style={{
										position: "fixed",
										top: circleRect.top + (window.innerHeight / 2 < circleRect.top ? -150 : 50),
										left: circleRect.left + (window.innerWidth / 2 < circleRect.left ? -100 : 100),
										borderRadius: "20px",
									}}
								>
									{$buy_link.slice(1).map((link) => (
										<div key={link.name}>
											<a href={link.url} target="_blank">
												{link?.name}
											</a>
										</div>
									))}
								</motion.div>
							}
						/>
					)}
				</AnimatePresence>
			) : null}
		</div>
	);
}
