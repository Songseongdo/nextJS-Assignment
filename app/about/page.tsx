import styles from "../../styles/aboutus.module.css";

export default function BookAbout() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>ABOUT US</div>
			<div className={styles.desc}>
				Welcom to the official explorer for The New York Times Best Seleer list explorer.
			</div>
			<div className={styles.desc}>We hope you enjoy your stay!</div>
		</div>
	);
}
