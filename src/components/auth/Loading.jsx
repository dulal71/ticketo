import spinnerData from '@/lottie/spinner.json'
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <Lottie
            animationData={spinnerData}
            loop={true}
            style={{ width: 100, height: 80 }}
        />
    );
};

export default Loading;