import dayjs from 'dayjs';

import { NewsClient } from '../../server/client';

import 'dayjs/locale/de-ch'; // import locale
import Card from './components/Card';
import ArticleDetail from './components/ArticleDetail';

const client = new NewsClient();

dayjs.locale('de-ch');

export const dividers = [
	'divide-emerald-500',
	'divide-red-400',
	'divide-cyan-700',
	'divide-yellow-500',
];

export default async function Home() {
	const articles = await client.fetchList();

	console.log(articles);

	return (
		<main className="flex max-w-[1920px] m-auto min-h-screen w-full">
			<div className="w-full container px-6 py-16 scrollbar-hide mx-auto">
				<h2 className="font-bold">News</h2>
				<div className="articles flex flex-wrap gap-4">
					{articles?.map((article) => (
						<Card key={article.id} article={article} />
					))}
				</div>
			</div>
			<ArticleDetail
				mostRecentArticleId={articles[0].id}
				relatedArticles={articles.slice(0, 2)}
			/>
		</main>
	);
}
