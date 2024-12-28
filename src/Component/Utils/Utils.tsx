import moment from 'moment';
import toast from 'react-hot-toast';

export const formatDate = (time: Date) => {
  return moment(time).format('LLLL');
};
export const naira = '\u20A6';

export const ToastAlert = (message: string) => {
  return toast.success(message, {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
}

export const ErrorAlert = (message: string) => {
  return toast.error(message, {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  });
}

export const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    }
  ]
};

export const igLink = `https://www.instagram.com/finnesse_oasis.ng?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==`
export const xLink = `https://x.com/oladev`
export const tiktokLink = `https://www.tiktok.com/@fafinnesseoasissalon?lang=en`
export const snapLink = `https://web.snapchat.com/`
export const fbLink = `https://web.facebook.com/profile.php?id=10009520016635`
export const LocalData = 'carts'

export const BookingStatus = (val: string): string | undefined => {
  if (val === 'pending') return `bg-red-100 text-red-700`;
  if (val === 'paid') return `bg-green-100 text-green-700`;
  if (val === 'delivery pending') return `bg-orange-100 text-orange-700`;
  if (val === 'delivered') return `bg-teal-100 text-teal-700`;
  if (val === 'not interested') return `bg-zinc-100 text-zinc-700`;
  return undefined;
}
