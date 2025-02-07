import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import styles from "./../styles/styles";
import YoutubePlayer from "react-native-youtube-iframe";
import Entypo from "react-native-vector-icons/Entypo";


const VideoScreen = ({ route, navigation }) => {
    const [playing, setPlaying] = useState(false);

    const { video } = route.params;
    const { videoList } = route.params;

    console.log("videoList===>", videoList)

    const extractVideoId = (video) => {
        const videoId = video.youtube_video_link.split("=")[1];
        console.log("videoId===>", videoId)
        return videoId;
    }

    const convertDuration = (duration) => {
        const minutes = Math.floor(parseInt(duration) / 60);
        const seconds = parseInt(duration) % 60;

        if (minutes > 60) {
            const hours = Math.floor(minutes / 60);
            const minutes = Math.floor(minutes % 60);

            return `${hours < 10 ? `0${hours.toString()}` : hours.toString()}:${minutes < 10 ? `0${minutes.toString()}` : minutes.toString()}:${seconds < 10 ? `0${seconds.toString()}` : seconds.toString()}`
        }
        else {
            return `${minutes < 10 ? `0${minutes.toString()}` : minutes.toString()}:${seconds < 10 ? `0${seconds.toString()}` : seconds.toString()}`
        }

    }

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.videoScreenContainer}>
            <View style={styles.videoFrameContainer}>
                <YoutubePlayer
                    width={Dimensions.get('window').width}
                    height={200}
                    play={playing}
                    videoId={extractVideoId(video)} // Replace with your YouTube video ID
                    onChangeState={onStateChange}
                />
            </View>
            <View style={styles.videoDetailsContainer}>
                <Text style={styles.videoName} numberOfLines={2} ellipsizeMode='tail'>{video.description}</Text>
            </View>
            <View style={styles.divider}></View>

            <Text style={[styles.studyPgTitle, { paddingHorizontal: 12 }]}>Related Videos</Text>

            <View style={styles.videoListContainer}>
                {
                    videoList.map((video, i) => (
                        <TouchableOpacity style={styles.singleVideoCard} key={i} onPress={() => navigation.replace("Video", { video: video, videoList: videoList })}>
                            <View style={styles.iconContainer}>
                                <Entypo name={"controller-play"} size={24} color={"white"} />
                            </View>
                            <View style={styles.videoDuration}>
                                <Text style={styles.durationText}>{convertDuration(video.duration)}</Text>
                            </View>
                            <View style={styles.videoThumbnailContainer}>
                                <Image source={{ uri: `http://192.168.29.213:8000/${video.thumbnail}` }} style={styles.videoThumbnail} />
                            </View>
                            <View style={styles.videoTitleContainer}>
                                <Text style={styles.videoTitle} numberOfLines={1} ellipsizeMode="tail" >{video.description}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>
    )
}

export default VideoScreen