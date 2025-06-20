export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { SignUpView } from "~/modules/auth/ui/views/sign-up-view";
import { caller } from "~/trpc/server";

export default async function Page() {
	const session = await caller.auth.session();

	if (session.user) {
		redirect("/");
	}

	return <SignUpView />;
}
