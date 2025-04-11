"use client";

import { RecoilRoot } from "recoil";
import Navigator from "../components/navigator";

export default function RecoilProvider({ children }: { children: React.ReactNode }) {
	return (
		<RecoilRoot>
			<Navigator />
			<div style={{ padding: "0px 10%" }}>{children}</div>
		</RecoilRoot>
	);
}
