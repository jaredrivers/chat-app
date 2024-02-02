"use client";

import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";
import {
	ApolloNextAppProvider,
	NextSSRApolloClient,
	NextSSRInMemoryCache,
	SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
	let uri =
		process.env.NODE_ENV === "development"
			? "https://localhost:4000/graphql"
			: "anotherURI";

	const httpLink = new HttpLink({
		// https://studio.apollographql.com/public/spacex-l4uc6p/
		uri,
	});
	console.log(uri);

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link:
			typeof window === "undefined"
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
				  ])
				: httpLink,
	});
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
}
