import React from 'react';
import preloaderSvg from "../../asseds/imgs/preloader.svg";

const Preloader = () => {
    return (
        <div>
            <img src={preloaderSvg} alt={'preloader.svg'}/>
        </div>
    );
};

export default Preloader;