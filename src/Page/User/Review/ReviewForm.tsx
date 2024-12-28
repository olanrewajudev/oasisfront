import React, { useState, ChangeEvent, FormEvent } from 'react'
import Reviews from './Reiews'
import { ErrorAlert, ToastAlert } from '../../../Component/Utils/Utils'
import { BsEmojiFrown, BsEmojiNeutral, BsEmojiSmile, BsEmojiLaughing, BsEmojiHeartEyes, BsQuestionCircle, BsStarFill } from 'react-icons/bs'
import { Apis, Posturl } from '../../../Component/Utils/Api'

interface Review {
    fullname: string;
    content: string;
    createdAt: Date;
    rating: string;
    status: string;
}

interface ReviewFormProps {
    revs: Review[];
    sendSignal: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ revs, sendSignal }) => {
    const [, setLoading] = useState(false)
    const [forms, setForms] = useState({
        fullname: '',
        content: '',
    })

    const handleForms = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    const [rates, setRates] = useState(0)
    const handleRates = (num: number) => {
        if (rates !== num) {
            setRates(num)
        } else {
            setRates(prev => prev - 1)
        }
    }

    let Icon = rates === 1 ? BsEmojiFrown : rates === 2 ? BsEmojiNeutral : rates === 3 ? BsEmojiSmile : rates === 4 ? BsEmojiLaughing : rates === 5 ? BsEmojiHeartEyes : BsQuestionCircle

    const handleSubmission = async (e: FormEvent) => {
        e.preventDefault()
        if (!forms.fullname) return ToastAlert('your fullname is required!')
        if (!forms.content) return ToastAlert('your review is required!')
        if (forms.content.length <= 100) return ToastAlert('your review content is too short!')

        const formdata = {
            content: forms.content,
            fullname: forms.fullname,
            rating: rates,
            status: Icon.name
        }
        setLoading(true)
        const res = await Posturl(Apis.services.add_review, formdata)
        setLoading(false)

        if (res.status === 200) {
            setForms({
                content: '',
                fullname: ''
            })
            setRates(0)
            sendSignal()
            return ToastAlert(res.msg)
        } else {
            return ErrorAlert(res.msg)
        }
    }

    return (
        <div className="">
            <div className="mx-5 grid lg:grid-cols-3 gap-4 md:grid-cols-2">
                {revs.length > 0 ? revs.map((item, i) => (
                    <Reviews key={i} item={item} />
                )) : <div className="text-center text-sm text-slate-500 mt-10">Be the first to make a review on this web app.</div>}
            </div>

            <div className="mb-32 mt-16 ">
                <div>
                    <div className="border p-5 mx-auto w-[90%]">
                        <form className='' onSubmit={handleSubmission}>

                            <div className="mb-3">
                                <div className="text-navy font-medium">Enter Fullname</div>
                                <input name="fullname" value={forms.fullname} onChange={handleForms} className="input" autoFocus={true} />
                            </div>
                            <div className="mb-3">
                                <div className="text-navy font-medium">Enter Review</div>
                                <textarea name="content" value={forms.content} onChange={handleForms} className="input" cols={7} rows={10}></textarea>
                            </div>
                            <div className="mb-3">
                                <div className="flex items-center flex-row gap-3">
                                    <div className="">Rate this website</div>
                                    <BsStarFill onClick={() => handleRates(1)} className={`cursor-pointer text-2xl hover:scale-150 transition-all ${rates > 0 ? 'text-light' : 'text-slate-300'}`} />
                                    <BsStarFill onClick={() => handleRates(2)} className={`cursor-pointer text-2xl hover:scale-150 transition-all ${rates > 1 ? 'text-light' : 'text-slate-300'}`} />
                                    <BsStarFill onClick={() => handleRates(3)} className={`cursor-pointer text-2xl hover:scale-150 transition-all ${rates > 2 ? 'text-light' : 'text-slate-300'}`} />
                                    <BsStarFill onClick={() => handleRates(4)} className={`cursor-pointer text-2xl hover:scale-150 transition-all ${rates > 3 ? 'text-light' : 'text-slate-300'}`} />
                                    <BsStarFill onClick={() => handleRates(5)} className={`cursor-pointer text-2xl hover:scale-150 transition-all ${rates > 4 ? 'text-light' : 'text-slate-300'}`} />
                                </div>
                                <div className="w-fit mx-auto mt-5">
                                    <Icon className='text-4xl text-slate-500' />
                                </div>
                            </div>
                            <div className="w-fit ml-auto">
                                <button type="submit" className="bg-light transition-all text-white rounded-full py-3 w-44 capitalize shadow-xl hover:bg-slate-200 hover:text-slate-800">submit review</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewForm
