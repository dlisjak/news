'use client';

import { dividers } from '@/app/page';
import { NewsInfo } from '@/types/news';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

import 'dayjs/locale/de-ch'; // import locale
import { FC } from 'react';
import { GoHeart } from 'react-icons/go';

type CardType = {
	article: NewsInfo;
};

const Card: FC<CardType> = ({ article }) => {
	// const router = useRouter();

	// const setSelectedArticle = (articleId) => {
	//   router.push("/", {})
	// }

	return (
		<div
			key={article.id}
			className={`bg-white drop-shadow-md divide-y-2 ${
				dividers[Math.floor(Math.random() * 4)]
			}`}
			// onClick={setSelectedArticle(article.id)}
		>
			<div className="relative flex h-[137px] bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)]">
				<img
					className="w-full object-cover z-[-1]"
					src={article?.image || ''}
					alt={'' + article.title}
				/>
				<div className="absolute bottom-4 left-4 right-4 flex justify-between text-white gap-2">
					<h3 className="font-bold">{article.title}</h3>
					<GoHeart className="cursor-pointer mt-auto text-2xl" />
				</div>
			</div>
			<div className="px-4 py-2 flex flex-col">
				<span className="text-[14px] italic text-slate-400">
					{dayjs(article.date).format('DD/MMMM/YYYY')}
				</span>
				<p className="py-2">{article.excerpt}</p>
			</div>
		</div>
	);
};

export default Card;
