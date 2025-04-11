"use client";

import { useEffect, useState } from "react";
import styles from "../styles/modal.module.css";

interface IProps {
	callFn: () => void;
	$mainBox?: React.ReactNode;
}

export default function Overlay({ callFn, $mainBox }: IProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div onClick={() => callFn()} className={styles.container}>
			{$mainBox}
		</div>
	);
}
