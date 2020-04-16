import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import { Icon, SearchBar } from '@ant-design/react-native'

const Search = () => {
    const [history, setHistory] = useState(['安安']);
    useEffect(() => {
        console.log(history)
    })
    return (
        <>
        <View style={styles.head}>
            <TextInput 
                placeholder="请输入您要搜索的关键字"
                style={styles.search} 
                autoFocus={true}
                onSubmitEditing={(event)=>{setHistory([...history,event.nativeEvent.text])}}
            />
            <Icon style={{position:'absolute',right:45,top:12}} name="search"/>
        </View>
        <Text style={{fontSize:16,marginLeft:20,marginTop:10}}>搜索历史</Text>
        <View style={styles.history}>
            <TouchableOpacity style={styles.historyBtn}>
                <Button color='#909399' title="美食"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.historyBtn}>
                <Button color='#909399' title="旅行"/>
            </TouchableOpacity>
            {
                history.map((item)=>(
                    <TouchableOpacity style={styles.historyBtn}>
                        <Button color='#909399' title={item}/>
                    </TouchableOpacity>
                ))
            }
        </View>
        </>
    )
}

export default Search

const styles = StyleSheet.create({
    search: {
        width:'85%',
        height:40,
        marginTop:5,
        backgroundColor:'#eeeeee',
        borderRadius:10,
    },
    head: {
        height:50,
        justifyContent:'center',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    history: {
        display:'flex',
        flexDirection:'row'
    },
    historyBtn: {
        width: 50,
        marginLeft:20,
        marginTop:10
    }
})