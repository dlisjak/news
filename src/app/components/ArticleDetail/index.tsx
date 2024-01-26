'use client';

import { useSearchParams } from 'next/navigation';
import { NewsInfo } from '@/types/news';
import { FC } from 'react';
import dayjs from 'dayjs';

import 'dayjs/locale/de-ch';
import { dividers } from '@/app/page';
import { GoHeart } from 'react-icons/go';
import { NewsClient } from '../../../../server/client';
import useSWR from 'swr';

const client = new NewsClient();

type ArticleDetailType = {
	mostRecentArticleId: string;
	relatedArticles: Array<NewsInfo>;
};

const ArticleDetail: FC<ArticleDetailType> = ({
	mostRecentArticleId,
	relatedArticles,
}) => {
	console.log({ mostRecentArticleId });
	const searchParams = useSearchParams();
	const articleId = searchParams.get('articleId');
	console.log({ articleId });
	const { data } = useSWR(
		articleId || mostRecentArticleId,
		articleId
			? () => client.fetchDetail(articleId)
			: () => client.fetchDetail(mostRecentArticleId)
	);

	console.log(data);

	if (!data) return null;

	return (
		<div className="w-full container hidden border-l md:flex flex-col scrollbar-hide">
			<div className="relative flex bg-gradient-to-t from-transparent to-[rgba(0,0,0,0.4)]">
				<img
					className="w-full object-cover z-[-1]"
					src={data?.image || ''}
					alt={'' + data}
				/>
				<span className="absolute top-4 left-4 text-[14px] italic text-white">
					{dayjs(data.date).format('DD/MMMM/YYYY')}
				</span>
			</div>
			<div className="mx-4 lg:mx-8 prose mx-auto py-12">
				<h1>{data.title}</h1>
				<div dangerouslySetInnerHTML={{ __html: data.content }}></div>
			</div>
			<div className="flex flex-col pb-16 mx-4 lg:mx-8">
				<h3 className="font-bold">Related articles</h3>
				<div className="flex flex-col gap-8">
					{relatedArticles.map((article) => (
						<div
							key={article.id}
							className={`w-full flex border bg-white drop-shadow-md divide-x-2 ${
								dividers[Math.floor(Math.random() * 4)]
							}`}
						>
							<img
								className="max-w-[133px] aspect-square object-cover z-[-1]"
								src={article?.image || ''}
								alt={'' + article}
							/>
							<div className="flex flex-col gap-1 py-2 pl-4">
								<span className="text-[14px] italic text-slate-400">
									{dayjs(article.date).format('DD/MMMM/YYYY')}
								</span>
								<h4 className="font-bold">{article.title}</h4>
								<p>{article.excerpt}</p>
								<GoHeart className="cursor-pointer absolute top-2 right-2 text-2xl" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ArticleDetail;
