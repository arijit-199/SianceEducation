import { Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import styles from "./../styles/styles";
import YoutubePlayer from "react-native-youtube-iframe";


const VideoScreen = ({route}) => {
    const [playing, setPlaying] = useState(false);
    const { video } = route.params;

    console.log("video===>", video);

    const getVideoId = () => {
        const videoId = video.youtube_video_link.split("=")[1];
        return videoId;
    }


    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    return (
        <View style={styles.videoScreenContainer}>
            <View style={styles.videoFrameContainer}>
                <YoutubePlayer
                    width={250}
                    height={250}
                    play={playing}
                    videoId={getVideoId()} // Replace with your YouTube video ID
                    onChangeState={onStateChange}
                />
            </View>
        </View>
    )
}

export default VideoScreen