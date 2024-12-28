import { useState } from 'react';
import {
    BsEmojiFrown,
    BsEmojiNeutral,
    BsEmojiSmile,
    BsEmojiLaughing,
    BsEmojiHeartEyes,
    BsClock,
    BsStarFill,
} from 'react-icons/bs';
import { ImUser } from 'react-icons/im';
import { formatDate } from '../../../Component/Utils/Utils';

const Icons = [
    BsEmojiFrown,
    BsEmojiNeutral,
    BsEmojiSmile,
    BsEmojiLaughing,
    BsEmojiHeartEyes,
];

interface ReviewProps {
    item: {
        fullname: string;
        createdAt: Date;
        rating: string;
        status: string;
        content: string;
    };
}

const MAX_LENGTH = 150; // Maximum number of characters to show before truncating

const Reviews: React.FC<ReviewProps> = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const truncatedContent =
        item.content.length > MAX_LENGTH && !isExpanded
            ? `${item.content.slice(0, MAX_LENGTH)}...`
            : item.content;

    return (
        <div className="mb-3">
            <div className="bg-light p-4  rounded-lg w-full h-auto shadow-lg">
                <div className="text-3xl text-white rounded-full border flex items-center justify-between px-4 py-1 mb-3">
                    <div className="">
                        <ImUser />
                    </div>
                    <div className=" top-4 right-4">
                        {Icons.map((Data, i) => {
                            return (
                                Data.name === item.status && (
                                    <Data key={i} className="text-xl text-white" />
                                )
                            );
                        })}
                    </div>
                </div>
                <div className="text-lg font-semibold capitalize text-navy">
                    {item.fullname}
                </div>
                <div className="text-sm text-white my-3 flex items-center gap-2">
                    <BsClock /> {formatDate(item.createdAt)}
                </div>
                <div className="flex my-3 items-center gap-2">
                    {new Array(parseInt(item.rating)).fill(null).map((_, i) => (
                        <BsStarFill key={i} className="text-orange-400" />
                    ))}
                </div>

                <div className="text-sm text-white whitespace-pre-wrap">
                    {truncatedContent}
                    {item.content.length > MAX_LENGTH && (
                        <button
                            onClick={toggleReadMore}
                            className="text-blue-500 ml-2 underline"
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reviews;