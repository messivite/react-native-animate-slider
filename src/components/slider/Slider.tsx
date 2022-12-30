import React, { useState } from 'react';
import type { Node } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Dimensions,
    StyleSheet,
    Text,
    Animated,
    FlatList,
    Image,
    useColorScheme,
    View,
} from 'react-native';


import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

const { width, height } = Dimensions.get('screen');


const Slider = ({ sliderData }: any) => {

    const isDarkMode = useColorScheme() === 'dark';
    const [currentPage, setCurrentPage] = useState(1);
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1

    };

    const data = sliderData
    const imageW = width * 0.7;
    const imageH = imageW * 1.5;
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const onScrollEnd = (e: any) => {
        let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5) + 1, 0), data.length);
        setCurrentPage(pageNumber)
    }

    const Bullet = React.useCallback(() => {

        return data.map((item, index) => {
            return (
                <Animated.View key={'Ss' + index} style={[
                    styles.paginationWrapper,
                    {
                        width: currentPage === index ? 15 : 10,
                        opacity: currentPage === index ? 1 : 0.5,
                    }
                ]} />
            )
        })


    }, [currentPage])

    return (
        <>

            <View style={{
                flex: 1,
                backgroundColor: '#000',
                justifyContent: 'space-between'
            }}>


                <View style={{
                    ...StyleSheet.absoluteFillObject
                }}>
                    {data.map((image, index) => {
                        const inputRange = [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width
                        ];
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0, 1, 0]
                        });


                        return (
                            <Animated.Image key={`image-${index}`}
                                source={{
                                    uri: image
                                }}
                                style={[
                                    StyleSheet.absoluteFillObject,
                                    {
                                        opacity
                                    },

                                ]}
                                blurRadius={50}
                            />
                        )
                    })}
                </View>




                <View style={{
                    flex: 1,

                }}>



                    <View style={{
                        flex: 1,
                        justifyContent: 'center',

                    }}>

                        <View>
                            <Animated.FlatList
                                data={data}

                                keyExtractor={(_, index) => index.toString()}
                                snapToAlignment="center"
                                scrollEventThrottle={10}
                                bounces={false}
                                onMomentumScrollEnd={onScrollEnd}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                horizontal
                                onScroll={Animated.event(
                                    [{
                                        nativeEvent: {
                                            contentOffset: {
                                                x: scrollX
                                            }
                                        },

                                    }],
                                    {
                                        useNativeDriver: true
                                    }
                                )}

                                renderItem={({ item, index }) => {
                                    const inputRange = [
                                        (index - 1) * width,
                                        index * width,
                                        (index + 1) * width
                                    ];
                                    const scale = scrollX.interpolate({
                                        inputRange,
                                        outputRange: [0, 1, 0],
                                        extrapolate: "clamp"
                                    });
                                    return (
                                        <View style={{
                                            width,
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                            shadowColor: '#000',
                                            shadowOpacity: .3,
                                            shadowOffset: {
                                                width: 0,
                                                height: 0
                                            },
                                            shadowRadius: 15
                                        }}>
                                            <Animated.Image source={{ uri: item }}
                                                style={
                                                    [
                                                        {
                                                            width: imageW,
                                                            height: imageH,
                                                            borderRadius: 16,
                                                            resizeMode: 'cover'
                                                        },
                                                        {
                                                            transform: [{ scale }],
                                                        },
                                                    ]
                                                }
                                            />

                                        </View>
                                    )
                                }}
                            />
                            <View style={{

                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                                flexDirection: 'row'
                            }}>



                                <Bullet />


                            </View>
                        </View>


                    </View>


                </View>



            </View>
        </>
    )
}
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    paginationWrapper: {
        marginHorizontal: 5,
        borderRadius: 10,
        height: 10,
        backgroundColor: 'white',
    }
});
export default Slider;