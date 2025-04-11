"use client";

import { atom, AtomEffect } from "recoil";

const localStorageEffect =
	<T>(key: string): AtomEffect<T> =>
	({ setSelf, onSet }) => {
		if (typeof window !== "undefined") {
			const savedValue = localStorage.getItem(key);
			if (savedValue !== null) {
				setSelf(JSON.parse(savedValue));
			}

			onSet((newValue, _, isReset) => {
				if (isReset) {
					localStorage.removeItem(key);
				} else {
					localStorage.setItem(key, JSON.stringify(newValue));
				}
			});
		}
	};

export const bookCatagory = atom<string | null>({
	key: "book_catagory",
	default: null,
	effects_UNSTABLE: [localStorageEffect("book_catagory")],
});
