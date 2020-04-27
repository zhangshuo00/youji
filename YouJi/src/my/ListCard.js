import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native'

const ListCard = () => {
    return (
        <View style={styles.card}>
            {/* <WingBlank size="lg"> */}
                <Card>
                    <Card.Header
                        title="有纪"
                        thumb="https://i.loli.net/2020/04/13/VbQtfsMRvDPx7Yg.png"
                        thumbStyle={{width: 30,height: 30}}
                    />
                    <Card.Body>
                        <Text style={{marginLeft: 30}}>都挺好</Text>
                        <View style={styles.cardContext}>
                            <Image source={{uri: 'https://i.loli.net/2020/04/13/ZN7XBoy6PT9pARS.jpg'}} style={styles.cardContextImg}/>
                            <Image source={{uri: 'https://i.loli.net/2020/04/13/RwKac9jq7rdGWkh.jpg'}} style={styles.cardContextImg}/>
                        </View>
                    </Card.Body>
                    <Card.Footer
                        content={
                            <View style={{display: 'flex',flexDirection: 'row',marginTop: 15}}>
                                <Image source={{uri: 'https://i.loli.net/2020/04/13/cWKiSzxOIo8fhtv.png'}} style={styles.cardBottomImage}/>
                                <Text>12</Text>
                                <Image source={{uri: 'https://i.loli.net/2020/04/13/kbr2KtWGMfvl51E.png'}} style={styles.cardBottomImage}/>
                                <Text>2</Text>
                            </View>
                        }
                    />
                </Card>
            {/* </WingBlank> */}
        </View>
    )
}

export default ListCard

const styles = StyleSheet.create({
    card: {
        paddingTop: 3,
        margin:0
    },
    cardTitle: {

    },
    cardContext: {
        display:'flex',
        height: 100,
        flexDirection: 'row',
        marginLeft: 30
    },
    cardContextImg: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginRight: 10
    },
    cardBottomImage: {
        width: 20,
        height: 20,
        marginLeft: 20
    }
})