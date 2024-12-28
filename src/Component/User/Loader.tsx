import { ReactNode, useEffect, useState } from 'react';
import spinner from '../../assets/spin2.gif';

type Props = {
    children: ReactNode;
};

const Loader = ({ children }: Props): JSX.Element => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <img src={spinner} alt="Loading spinner" />
            </div>
        );
    }

    return <div>{children}</div>;
};

export default Loader;
