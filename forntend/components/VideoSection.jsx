

export default function IntroVideo() {
    return (
        <div className="intro-video-box">
            <div className="container-fluid">
                <div className="row no-gutters">
                    <div className="col-lg-12">
                        <div className="intro-video wow fadeInUp" data-wow-delay="0.2s">

                            {/* Intro Image */}
                            <div className="intro-video-image">
                                <figure>
                                    <img src="/images/banners/banner3.webp" alt="" />
                                </figure>
                            </div>

                            {/* Video Play Button */}
                            <div className="video-play-button">

                                <a
                                    href="https://www.youtube.com/watch?v=p_pyRDeVT4k"
                                    className="popup-video"
                                    data-cursor-text="Play"
                                >
                                    Play
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}